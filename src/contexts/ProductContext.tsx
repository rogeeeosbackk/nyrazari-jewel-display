import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  // Rings
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 2899,
    offerPrice: 2299,
    images: ['/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg'],
    category: 'rings',
    description: 'Exquisite 18k white gold eternity ring featuring brilliant-cut diamonds',
    stock: 5,
  },
  {
    id: '2',
    name: 'Rose Gold Wedding Band',
    price: 799,
    images: ['/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg'],
    category: 'rings',
    description: 'Classic rose gold wedding band with subtle texture',
    stock: 15,
  },
  {
    id: '3',
    name: 'Vintage Ruby Ring',
    price: 3299,
    offerPrice: 2799,
    images: ['/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg'],
    category: 'rings',
    description: 'Art deco inspired ruby ring with diamond accents',
    stock: 3,
  },
  {
    id: '4',
    name: 'Platinum Solitaire',
    price: 4599,
    images: ['/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg'],
    category: 'rings',
    description: 'Classic platinum solitaire engagement ring',
    stock: 7,
  },
  {
    id: '5',
    name: 'Moonstone Cocktail Ring',
    price: 1299,
    offerPrice: 999,
    images: ['/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg'],
    category: 'rings',
    description: 'Statement moonstone ring in yellow gold setting',
    stock: 9,
  },
  {
    id: '6',
    name: 'Tanzanite Cluster Ring',
    price: 2299,
    images: ['/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg'],
    category: 'rings',
    description: 'Unique tanzanite cluster design in white gold',
    stock: 4,
  },
  {
    id: '7',
    name: 'Opal Anniversary Band',
    price: 1599,
    offerPrice: 1299,
    images: ['/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg'],
    category: 'rings',
    description: 'Delicate opal anniversary band with milgrain details',
    stock: 8,
  },
  {
    id: '8',
    name: 'Black Diamond Ring',
    price: 1899,
    images: ['/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg'],
    category: 'rings',
    description: 'Modern black diamond ring in rose gold',
    stock: 6,
  },
  {
    id: '9',
    name: 'Emerald Cut Aquamarine Ring',
    price: 2799,
    offerPrice: 2399,
    images: ['/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg', '/src/assets/ring-diamond-eternity.jpg'],
    category: 'rings',
    description: 'Stunning emerald cut aquamarine with diamond halo',
    stock: 5,
  },
  {
    id: '10',
    name: 'Vintage Inspired Sapphire Ring',
    price: 3499,
    images: ['/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg', '/src/assets/ring-rose-gold-band.jpg'],
    category: 'rings',
    description: 'Blue sapphire ring with vintage filigree work',
    stock: 3,
  },
  
  // Necklaces
  {
    id: '11',
    name: 'Gold Chain Necklace',
    price: 1599,
    offerPrice: 1299,
    images: ['/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg'],
    category: 'necklaces',
    description: 'Luxurious 14k gold chain necklace with adjustable length',
    stock: 8,
  },
  {
    id: '12',
    name: 'Emerald Pendant Necklace',
    price: 2199,
    images: ['/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg'],
    category: 'necklaces',
    description: 'Stunning emerald pendant on delicate gold chain',
    stock: 4,
  },
  {
    id: '13',
    name: 'Diamond Solitaire Pendant',
    price: 1899,
    offerPrice: 1599,
    images: ['/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg'],
    category: 'necklaces',
    description: 'Classic diamond solitaire pendant in white gold',
    stock: 12,
  },
  {
    id: '14',
    name: 'Pearl Strand Necklace',
    price: 899,
    images: ['/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg'],
    category: 'necklaces',
    description: 'Cultured pearl strand with gold clasp',
    stock: 15,
  },
  {
    id: '15',
    name: 'Layered Gold Chains',
    price: 699,
    offerPrice: 549,
    images: ['/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg'],
    category: 'necklaces',
    description: 'Trendy layered gold chain set',
    stock: 20,
  },
  {
    id: '16',
    name: 'Ruby Heart Pendant',
    price: 1499,
    images: ['/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg'],
    category: 'necklaces',
    description: 'Romantic ruby heart pendant with diamond accent',
    stock: 7,
  },
  {
    id: '17',
    name: 'Sapphire Bar Necklace',
    price: 1299,
    offerPrice: 1099,
    images: ['/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg'],
    category: 'necklaces',
    description: 'Modern sapphire bar pendant on delicate chain',
    stock: 10,
  },
  {
    id: '18',
    name: 'Vintage Locket',
    price: 799,
    images: ['/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg'],
    category: 'necklaces',
    description: 'Antique-inspired gold locket with engraving',
    stock: 6,
  },
  {
    id: '19',
    name: 'Tennis Diamond Necklace',
    price: 3999,
    offerPrice: 3399,
    images: ['/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg', '/src/assets/necklace-gold-chain.jpg'],
    category: 'necklaces',
    description: 'Luxurious tennis diamond necklace',
    stock: 2,
  },
  {
    id: '20',
    name: 'Turquoise Statement Necklace',
    price: 1199,
    images: ['/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg', '/src/assets/necklace-emerald-pendant.jpg'],
    category: 'necklaces',
    description: 'Bold turquoise statement piece in silver',
    stock: 8,
  },

  // Bracelets
  {
    id: '21',
    name: 'Pearl Tennis Bracelet',
    price: 899,
    offerPrice: 699,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Elegant freshwater pearl tennis bracelet with gold clasp',
    stock: 12,
  },
  {
    id: '22',
    name: 'Diamond Tennis Bracelet',
    price: 2999,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Classic diamond tennis bracelet in white gold',
    stock: 5,
  },
  {
    id: '23',
    name: 'Gold Bangle Set',
    price: 699,
    offerPrice: 549,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Set of three gold bangles in different textures',
    stock: 18,
  },
  {
    id: '24',
    name: 'Charm Bracelet',
    price: 599,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Silver charm bracelet with starter charms',
    stock: 25,
  },
  {
    id: '25',
    name: 'Emerald Line Bracelet',
    price: 1999,
    offerPrice: 1699,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Emerald line bracelet with diamond accents',
    stock: 6,
  },
  {
    id: '26',
    name: 'Rose Gold Cuff',
    price: 799,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Hammered rose gold cuff bracelet',
    stock: 14,
  },
  {
    id: '27',
    name: 'Sapphire Tennis Bracelet',
    price: 2299,
    offerPrice: 1899,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Blue sapphire tennis bracelet in platinum',
    stock: 4,
  },
  {
    id: '28',
    name: 'Leather Cord Bracelet',
    price: 299,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Leather cord bracelet with gold closure',
    stock: 30,
  },
  {
    id: '29',
    name: 'Vintage Chain Bracelet',
    price: 899,
    offerPrice: 749,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Vintage-inspired chain bracelet in yellow gold',
    stock: 11,
  },
  {
    id: '30',
    name: 'Gemstone Beaded Bracelet',
    price: 499,
    images: ['/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg', '/src/assets/bracelet-pearl-tennis.jpg'],
    category: 'bracelets',
    description: 'Mixed gemstone beaded bracelet with gold accents',
    stock: 20,
  },

  // Earrings
  {
    id: '31',
    name: 'Sapphire Stud Earrings',
    price: 1299,
    offerPrice: 1099,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Beautiful blue sapphire stud earrings set in platinum',
    stock: 6,
  },
  {
    id: '32',
    name: 'Diamond Drop Earrings',
    price: 1899,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Elegant diamond drop earrings in white gold',
    stock: 8,
  },
  {
    id: '33',
    name: 'Pearl Hoop Earrings',
    price: 699,
    offerPrice: 549,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Freshwater pearl hoop earrings in gold',
    stock: 15,
  },
  {
    id: '34',
    name: 'Ruby Chandelier Earrings',
    price: 2499,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Statement ruby chandelier earrings',
    stock: 3,
  },
  {
    id: '35',
    name: 'Gold Geometric Studs',
    price: 399,
    offerPrice: 299,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Modern geometric stud earrings in gold',
    stock: 22,
  },
  {
    id: '36',
    name: 'Emerald Huggie Hoops',
    price: 1599,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Emerald huggie hoop earrings in white gold',
    stock: 7,
  },
  {
    id: '37',
    name: 'Vintage Art Deco Earrings',
    price: 1999,
    offerPrice: 1699,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Art deco inspired vintage earrings',
    stock: 4,
  },
  {
    id: '38',
    name: 'Opal Dangle Earrings',
    price: 899,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Opal dangle earrings with gold setting',
    stock: 9,
  },
  {
    id: '39',
    name: 'Diamond Cluster Studs',
    price: 1699,
    offerPrice: 1399,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Diamond cluster stud earrings',
    stock: 12,
  },
  {
    id: '40',
    name: 'Turquoise Statement Earrings',
    price: 799,
    images: ['/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg', '/src/assets/earrings-sapphire-studs.jpg'],
    category: 'earrings',
    description: 'Bold turquoise statement earrings in silver',
    stock: 6,
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database format to Product interface
      const transformedProducts = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        offerPrice: p.offer_price ? Number(p.offer_price) : undefined,
        images: p.images || [],
        category: p.category,
        description: p.description,
        stock: p.stock,
      }));

      setProducts(transformedProducts);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          price: productData.price,
          offer_price: productData.offerPrice,
          images: productData.images,
          category: productData.category,
          description: productData.description,
          stock: productData.stock,
        })
        .select()
        .single();

      if (error) throw error;

      // Transform and add to local state
      const newProduct: Product = {
        id: data.id,
        name: data.name,
        price: Number(data.price),
        offerPrice: data.offer_price ? Number(data.offer_price) : undefined,
        images: data.images || [],
        category: data.category,
        description: data.description,
        stock: data.stock,
      };

      setProducts(prev => [newProduct, ...prev]);
      toast.success('Product added successfully!');
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          price: updates.price,
          offer_price: updates.offerPrice,
          images: updates.images,
          category: updates.category,
          description: updates.description,
          stock: updates.stock,
        })
        .eq('id', id);

      if (error) throw error;

      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...updates } : product
        )
      );
      toast.success('Product updated successfully!');
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
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