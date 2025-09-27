import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './CartContext';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Initial dummy product data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 2899,
    image: '/src/assets/ring-diamond-eternity.jpg',
    category: 'rings',
    description: 'Exquisite 18k white gold eternity ring featuring brilliant-cut diamonds',
    stock: 5,
  },
  {
    id: '2',
    name: 'Gold Chain Necklace',
    price: 1599,
    image: '/src/assets/necklace-gold-chain.jpg',
    category: 'necklaces',
    description: 'Luxurious 14k gold chain necklace with adjustable length',
    stock: 8,
  },
  {
    id: '3',
    name: 'Pearl Tennis Bracelet',
    price: 899,
    image: '/src/assets/bracelet-pearl-tennis.jpg',
    category: 'bracelets',
    description: 'Elegant freshwater pearl tennis bracelet with gold clasp',
    stock: 12,
  },
  {
    id: '4',
    name: 'Sapphire Stud Earrings',
    price: 1299,
    image: '/src/assets/earrings-sapphire-studs.jpg',
    category: 'earrings',
    description: 'Beautiful blue sapphire stud earrings set in platinum',
    stock: 6,
  },
  {
    id: '5',
    name: 'Rose Gold Wedding Band',
    price: 799,
    image: '/src/assets/ring-rose-gold-band.jpg',
    category: 'rings',
    description: 'Classic rose gold wedding band with subtle texture',
    stock: 15,
  },
  {
    id: '6',
    name: 'Emerald Pendant Necklace',
    price: 2199,
    image: '/src/assets/necklace-emerald-pendant.jpg',
    category: 'necklaces',
    description: 'Stunning emerald pendant on delicate gold chain',
    stock: 4,
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem('nyrazari-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever they change
    if (products.length > 0) {
      localStorage.setItem('nyrazari-products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        searchProducts,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};