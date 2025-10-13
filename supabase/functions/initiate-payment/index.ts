import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: any[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      items,
    }: PaymentRequest = await req.json();

    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPE_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPE_SALT_INDEX");
    const baseUrl = Deno.env.get("PHONEPE_BASE_URL");

    if (!merchantId || !saltKey || !saltIndex || !baseUrl) {
      throw new Error("PhonePe configuration missing");
    }

    // Generate unique transaction ID
    const merchantTransactionId = `TXN_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // Amount in paise (PhonePe requires amount in smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    const callbackUrl = `${Deno.env.get(
      "SUPABASE_URL"
    )}/functions/v1/verify-payment`;
    const redirectUrl = `${
      req.headers.get("origin") || "http://localhost:3000"
    }/cart?payment=success`;

    // Create payment payload
    const payload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: user.id,
      amount: amountInPaise,
      redirectUrl: redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl,
      mobileNumber: customerPhone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    console.log("Payment payload:", JSON.stringify(payload, null, 2));

    // Base64 encode the payload
    const base64Payload = btoa(JSON.stringify(payload));

    // Generate checksum: base64Payload + "/pg/v1/pay" + saltKey
    const checksumString = base64Payload + "/pg/v1/pay" + saltKey;
    const encoder = new TextEncoder();
    const data = encoder.encode(checksumString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const checksum =
      hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") +
      "###" +
      saltIndex;

    console.log("Checksum generated:", checksum);

    // Make request to PhonePe
    const phonePeResponse = await fetch(`${baseUrl}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    });

    const phonePeData = await phonePeResponse.json();
    console.log("PhonePe response:", JSON.stringify(phonePeData, null, 2));

    if (!phonePeData.success) {
      throw new Error(
        phonePeData.message || "Failed to initiate payment with PhonePe"
      );
    }

    // Store order in database
    const { error: orderError } = await supabaseClient.from("orders").insert({
      user_id: user.id,
      merchant_transaction_id: merchantTransactionId,
      amount: amount,
      status: "PENDING",
      items: items,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      payment_url: phonePeData.data.instrumentResponse.redirectInfo.url,
    });

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order");
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: phonePeData.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId: merchantTransactionId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in initiate-payment:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
