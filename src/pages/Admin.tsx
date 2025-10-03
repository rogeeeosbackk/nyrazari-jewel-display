import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    images: [] as string[],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Check if user is admin
  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !data) {
        toast({
          title: "Access Denied",
          description: "You do not have admin access",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      stock: '',
      images: [],
    });
    setEditingProduct(null);
    setSelectedFiles([]);
    setImagePreviews([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 3;
    
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Too many images",
        description: `You can only upload up to ${maxFiles} images per product.`,
        variant: "destructive",
      });
      return;
    }

    const newFiles = [...selectedFiles, ...files].slice(0, maxFiles);
    setSelectedFiles(newFiles);

    // Create preview URLs
    const newPreviews: string[] = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newPreviews.push(result);
        if (newPreviews.length === newFiles.length) {
          setImagePreviews(newPreviews);
          setFormData(prev => ({ ...prev, images: newPreviews }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);
    setFormData(prev => ({ ...prev, images: newPreviews }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Missing required fields",
        description: "Please fill in name, price, and category.",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      stock: parseInt(formData.stock) || 0,
      images: formData.images.length > 0 ? formData.images : ['/src/assets/placeholder-product.jpg'],
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled in context
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      stock: product.stock.toString(),
      images: product.images || [],
    });
    setImagePreviews(product.images || []);
    setSelectedFiles([]);
    setIsDialogOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      await deleteProduct(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold">
              Admin <span className="text-luxury">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage your jewelry catalog</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(products.map(p => p.category)).size}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Product Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-luxury" onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Product Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price *</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category *</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rings">Rings</SelectItem>
                        <SelectItem value="necklaces">Necklaces</SelectItem>
                        <SelectItem value="bracelets">Bracelets</SelectItem>
                        <SelectItem value="earrings">Earrings</SelectItem>
                        <SelectItem value="watches">Watches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Stock</label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Product Images (Up to 3)</label>
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      disabled={imagePreviews.length >= 3}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                              onClick={() => handleRemoveImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="btn-luxury">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Products Table */}
        <motion.div
          className="card-luxury overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images?.[0] || product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-muted"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 capitalize">{product.category}</td>
                    <td className="p-4">${product.price.toLocaleString()}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}