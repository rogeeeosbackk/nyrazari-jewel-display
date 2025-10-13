import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPE_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPE_SALT_INDEX");
    const baseUrl = Deno.env.get("PHONEPE_BASE_URL");

    if (!merchantId || !saltKey || !saltIndex || !baseUrl) {
      throw new Error("PhonePe configuration missing");
    }

    // Get merchant transaction ID from callback
    const url = new URL(req.url);
    const merchantTransactionId =
      url.searchParams.get("merchantTransactionId") || "";

    if (!merchantTransactionId) {
      throw new Error("Missing merchant transaction ID");
    }

    console.log("Verifying payment for:", merchantTransactionId);

    // Generate checksum for status check
    const statusCheckString =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
    const encoder = new TextEncoder();
    const data = encoder.encode(statusCheckString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const checksum =
      hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") +
      "###" +
      saltIndex;

    // Check payment status with PhonePe
    const statusResponse = await fetch(
      `${baseUrl}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": merchantId,
        },
      }
    );

    const statusData = await statusResponse.json();
    console.log("Payment status:", JSON.stringify(statusData, null, 2));

    // Update order in database
    const paymentStatus = statusData.success
      ? statusData.data.state === "COMPLETED"
        ? "COMPLETED"
        : "PENDING"
      : "FAILED";

    const { error: updateError } = await supabaseClient
      .from("orders")
      .update({
        status: paymentStatus,
        phonepe_transaction_id: statusData.data?.transactionId || null,
      })
      .eq("merchant_transaction_id", merchantTransactionId);

    if (updateError) {
      console.error("Error updating order:", updateError);
    }

    // Redirect user based on payment status
    const redirectUrl =
      statusData.success && statusData.data.state === "COMPLETED"
        ? `${req.headers.get("origin") || "http://localhost:3000"
        }/cart?payment=success&txnId=${merchantTransactionId}`
        : `${req.headers.get("origin") || "http://localhost:3000"
        }/cart?payment=failed`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    });
  } catch (error: any) {
    console.error("Error in verify-payment:", error);
    
    // Redirect to error page
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${req.headers.get("origin") || "http://localhost:3000"
        }/cart?payment=failed`,
      },
    });
  }
});
