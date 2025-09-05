import React, { useEffect } from 'react';
import './App.css';

// Components
import { 
  Header, 
  Footer, 
  ProductGrid, 
  StatsBar,
  FilterPanel,
  QuickFilters
} from './components';

// Hooks
import { useProducts, useProductFilters } from './hooks';

// Toast utilities
import { showErrorToast, showSuccessToast, toastMessages } from './utils/toast';

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
    hasActiveFilters,
    // Advanced filters
    priceRange,
    setPriceRange,
    discountRange,
    setDiscountRange,
    sortBy,
    setSortBy,
    showOnlyDiscounted,
    setShowOnlyDiscounted,
    category,
    setCategory,
    priceStats
  } = useProductFilters(products);

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      showErrorToast(toastMessages.error.loadingFailed);
    }
  }, [error]);

  // Enhanced handlers with toast notifications
  const handleClearFilters = () => {
    clearFilters();
    showSuccessToast(toastMessages.success.filtersCleared);
  };

  const handleRefresh = async () => {
    try {
      await refresh();
      showSuccessToast(toastMessages.success.dataRefreshed);
    } catch (err) {
      console.error('Refresh failed:', err);
      showErrorToast(toastMessages.error.networkError);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800">
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
          onClearFilters={handleClearFilters}
          onRefresh={handleRefresh}
          sortBy={sortBy}
          category={category}
          showOnlyDiscounted={showOnlyDiscounted}
        />

        <QuickFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          showOnlyDiscounted={showOnlyDiscounted}
          setShowOnlyDiscounted={setShowOnlyDiscounted}
          setDiscountRange={setDiscountRange}
          clearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <FilterPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          discountRange={discountRange}
          setDiscountRange={setDiscountRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showOnlyDiscounted={showOnlyDiscounted}
          setShowOnlyDiscounted={setShowOnlyDiscounted}
          category={category}
          setCategory={setCategory}
          clearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          priceStats={priceStats}
          totalProducts={filteredProducts.length}
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
