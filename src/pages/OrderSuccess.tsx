import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground">
          Thank You for Your Order!
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Your order has been successfully placed and is being processed.
        </p>
        
        {orderId && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-foreground font-semibold">{orderId}</p>
          </div>
        )}
        
        <p className="text-muted-foreground">
          We'll send you a confirmation email with your order details shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => navigate("/")}
            variant="default"
            size="lg"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => navigate("/shop")}
            variant="outline"
            size="lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
