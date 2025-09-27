import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hero-gradient text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold text-luxury">Nyrazari</div>
            <p className="text-gray-300 leading-relaxed">
              Crafting exquisite jewelry pieces that celebrate life's precious moments
              with unparalleled elegance and artistry.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'Shop', 'About', 'Contact', 'Cart'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-primary">Categories</h3>
            <div className="space-y-2">
              {['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches'].map((category) => (
                <Link
                  key={category}
                  to={`/shop?category=${category.toLowerCase()}`}
                  className="block text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-primary">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@nyrazari.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="btn-luxury">Subscribe</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-300 text-sm">
            © {currentYear} Nyrazari. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-300">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/returns" className="hover:text-primary transition-colors">
              Returns
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;