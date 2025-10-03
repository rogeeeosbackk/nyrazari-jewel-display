-- Fix security linter issues (with CASCADE)

-- Add RLS policy for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix search_path for handle_updated_at function (drop with CASCADE)
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger since it was dropped with CASCADE
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Fix search_path for handle_new_user function (drop with CASCADE)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Recreate the trigger since it was dropped with CASCADE
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();