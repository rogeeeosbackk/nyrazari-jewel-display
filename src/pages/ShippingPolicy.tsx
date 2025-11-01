import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, MapPin } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Shipping Policy
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            {/* Shipping Methods */}
            <section className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Shipping Methods</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Standard Shipping (5-7 business days)</h3>
                  <p>Free on orders over $100. $9.99 for orders under $100.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Express Shipping (2-3 business days)</h3>
                  <p>$19.99 for all orders.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Overnight Shipping (1 business day)</h3>
                  <p>$29.99 for all orders.</p>
                </div>
              </div>
            </section>

            {/* Processing Time */}
            <section className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Processing Time</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All orders are processed within 1-2 business days. Orders are not shipped or delivered
                  on weekends or holidays.
                </p>
                <p>
                  If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                  Please allow additional days in transit for delivery.
                </p>
                <p>
                  You will receive a shipping confirmation email with tracking information once your order
                  has been shipped.
                </p>
              </div>
            </section>

            {/* Shipping Locations */}
            <section className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Shipping Locations</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We currently ship to addresses within the United States and select international locations.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Domestic Shipping</h3>
                  <p>Available to all 50 US states, including Alaska and Hawaii.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">International Shipping</h3>
                  <p>
                    Available to Canada, United Kingdom, Australia, and select European countries.
                    International shipping rates and delivery times vary by location.
                  </p>
                </div>
              </div>
            </section>

            {/* Package Security */}
            <section className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Package Security</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All jewelry items are shipped in discreet, unmarked packaging to ensure security.
                  High-value orders require a signature upon delivery.
                </p>
                <p>
                  We are not responsible for lost or stolen packages that show as delivered by the
                  carrier. Please ensure your shipping address is secure or consider using a delivery
                  service that provides package holding.
                </p>
              </div>
            </section>

            {/* Order Tracking */}
            <section className="bg-card p-8 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Order Tracking</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Once your order has shipped, you will receive a tracking number via email. You can
                  track your package through the carrier's website or in your account under "Order History."
                </p>
                <p>
                  If you have questions about your order or need assistance with tracking, please
                  contact our customer service team at hello@nyrazari.com.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-primary/5 p-8 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our shipping policy, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: hello@nyrazari.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: Monday-Friday, 9am-6pm EST</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
