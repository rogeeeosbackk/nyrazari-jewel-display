import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, customerName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Order Confirmed!
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          className="text-center space-y-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
            <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              Thank you, {customerName}!
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We've received your order successfully. Our team will contact you soon via 
              <span className="font-semibold text-green-600"> WhatsApp</span> to confirm 
              product availability and finalize your purchase.
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• We'll check product availability</li>
              <li>• Contact you via WhatsApp within 24 hours</li>
              <li>• Confirm your order details</li>
              <li>• Arrange payment and delivery</li>
            </ul>
          </div>

          <Button 
            onClick={onClose}
            className="w-full btn-luxury"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;