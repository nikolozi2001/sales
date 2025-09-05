import React from 'react';
import './App.css';

// Components
import { 
  Header, 
  Footer, 
  ProductGrid, 
  StatsBar 
} from './components';

// Hooks
import { useProducts, useProductFilters } from './hooks';

/**
 * Main Application Component
 * Displays discounted products from Georgian grocery stores
 */
const App = () => {
  // Fetch products data
  const { products, loading, error, refresh } = useProducts();
  
  // Handle filtering
  const {
    filteredProducts,
    setSearchQuery,
    selectedStore,
    setSelectedStore,
    clearFilters,
    hasActiveFilters
  } = useProductFilters(products);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header 
        onSearch={setSearchQuery} 
        selectedStore={selectedStore} 
        setSelectedStore={setSelectedStore} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsBar
          totalProducts={filteredProducts.length}
          selectedStore={selectedStore}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onRefresh={refresh}
        />

        <ProductGrid 
          products={filteredProducts} 
          loading={loading} 
          error={error} 
        />

        <Footer />
      </main>
    </div>
  );
};

export default App;
