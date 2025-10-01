// Utility to migrate product data from old format to new format
export const migrateProductData = () => {
  const savedProducts = localStorage.getItem('nyrazari-products');
  
  if (savedProducts) {
    try {
      const products = JSON.parse(savedProducts);
      const needsMigration = products.some((p: any) => p.image && !p.images);
      
      if (needsMigration) {
        console.log('Migrating product data to new format...');
        const migrated = products.map((p: any) => ({
          ...p,
          images: p.images || (p.image ? [p.image, p.image, p.image] : []),
        }));
        
        // Remove old image property
        const cleaned = migrated.map((p: any) => {
          const { image, ...rest } = p;
          return rest;
        });
        
        localStorage.setItem('nyrazari-products', JSON.stringify(cleaned));
        console.log('Migration complete!');
        return cleaned;
      }
    } catch (error) {
      console.error('Error migrating products:', error);
    }
  }
  
  return null;
};
