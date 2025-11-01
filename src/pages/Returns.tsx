const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Returns & Refunds Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Return Window</h2>
          <p>
            We accept returns within 30 days of delivery. To be eligible for a return, items must be 
            unused, in their original packaging, and in the same condition as received.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Return Conditions</h2>
          <p>To qualify for a return, the following conditions must be met:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Item must be returned within 30 days of delivery date</li>
            <li>Product must be in original, unworn condition</li>
            <li>All original tags and packaging must be intact</li>
            <li>Certificate of authenticity (if applicable) must be included</li>
            <li>Item must not show signs of wear, damage, or alterations</li>
            <li>Custom or personalized items cannot be returned</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Custom-made or engraved jewelry</li>
            <li>Pierced earrings (for hygiene reasons)</li>
            <li>Items marked as final sale</li>
            <li>Gift cards</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">How to Initiate a Return</h2>
          <p>To start a return:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>Contact our customer service through the Contact page</li>
            <li>Provide your order number and reason for return</li>
            <li>Wait for return authorization and instructions</li>
            <li>Pack the item securely in original packaging</li>
            <li>Ship to the address provided using a trackable shipping method</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Refund Process</h2>
          <p>
            Once we receive and inspect your return, we will notify you of the approval or rejection. 
            If approved, your refund will be processed within 5-7 business days to your original payment 
            method. Please note that it may take additional time for your bank to post the refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Shipping Costs</h2>
          <p>
            Return shipping costs are the responsibility of the customer unless the item received was 
            defective or incorrect. We recommend using a trackable shipping service and purchasing 
            shipping insurance for valuable items.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Exchanges</h2>
          <p>
            We do not offer direct exchanges. If you need a different size or style, please return the 
            original item for a refund and place a new order for the desired item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact us immediately with photos of the 
            damage. We will arrange for a replacement or full refund at no cost to you, including return 
            shipping.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Late or Missing Refunds</h2>
          <p>
            If you haven't received your refund within the specified timeframe, first check your bank 
            account. Then contact your credit card company and bank. If you've done all of this and still 
            have not received your refund, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
          <p>
            For any questions about returns or refunds, please reach out through our Contact page or 
            check your order status in your Profile.
          </p>
        </section>

        <p className="text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Returns;
