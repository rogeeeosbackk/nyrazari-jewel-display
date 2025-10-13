import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CustomerForm, { CustomerData } from '../components/CustomerForm';
import WhatsAppModal from '../components/WhatsAppModal';
import { supabase } from '@/integrations/supabase/client';

const Cart: React.FC = () => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const txnId = searchParams.get('txnId');
    
    if (paymentStatus === 'success') {
      toast({
        title: "Payment Successful! 🎉",
        description: txnId ? `Transaction ID: ${txnId}` : "Your order has been placed successfully.",
      });
      clearCart();
    } else if (paymentStatus === 'failed') {
      toast({
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setShowCustomerForm(true);
  };

  const handleCustomerFormSubmit = async (customerData: CustomerData) => {
    setIsProcessing(true);
    
    try {
      // Calculate total with tax
      const totalWithTax = total * 1.08;

      // Call PhonePe payment initiation
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to complete your purchase.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('initiate-payment', {
        body: {
          amount: totalWithTax,
          customerName: customerData.name,
          customerEmail: customerData.email,
          customerPhone: customerData.phone,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success && data?.paymentUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleWhatsAppModalClose = () => {
    setShowWhatsAppModal(false);
    setCustomerName('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Discover our exquisite jewelry collection and find the perfect piece for you.
          </p>
          <Link to="/shop">
            <Button className="btn-luxury">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping <span className="text-luxury">Cart</span>
          </h1>
          <p className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="card-luxury p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">
                          {item.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Summary Card */}
            <div className="card-luxury p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(total * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full btn-luxury text-lg py-4"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <Link to="/shop" className="block">
                  <Button variant="outline" className="w-full btn-outline-luxury">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🚚</span>
                  <span>Free shipping worldwide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>↩️</span>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Customer Information Modal */}
        {showCustomerForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCustomerForm(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2">
                  Please provide your contact details so we can reach you about your order.
                </p>
              </div>
              <div className="p-6">
                <CustomerForm 
                  onSubmit={handleCustomerFormSubmit}
                  isLoading={isProcessing}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* WhatsApp Contact Modal */}
        <WhatsAppModal
          isOpen={showWhatsAppModal}
          onClose={handleWhatsAppModalClose}
          customerName={customerName}
        />
      </div>
    </div>
  );
};

export default Cart;