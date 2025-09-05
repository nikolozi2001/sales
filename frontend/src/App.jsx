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
import { useProducts } from './hooks';

// Toast utilities
import { showErrorToast, showSuccessToast, toastMessages } from './utils/toast';

/**
 * Main Application Component
 * Displays discounted products from Georgian grocery stores
 */
const App = () => {
  // Fetch products data and handle filtering/pagination
  const {
    products, // paginated and filtered products
    loading,
    error,
    refresh,
    searchQuery,
    setSearchQuery,
    selectedStore,
    setSelectedStore,
    clearFilters,
    hasActiveFilters,
    priceRange,
    setPriceRange,
    discountRange,
    setDiscountRange,
    sortBy,
    setSortBy,
    showOnlyDiscounted,
    setShowOnlyDiscounted,
    priceStats,
    currentPage,
    setCurrentPage,
    productsPerPage,
    totalPages,
  } = useProducts();

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
        searchQuery={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsBar
          totalProducts={products.length}
          selectedStore={selectedStore}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
          onRefresh={handleRefresh}
          sortBy={sortBy}
          showOnlyDiscounted={showOnlyDiscounted}
        />

        <QuickFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          showOnlyDiscounted={showOnlyDiscounted}
          setShowOnlyDiscounted={setShowOnlyDiscounted}
          setDiscountRange={setDiscountRange}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
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
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          clearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          priceStats={priceStats}
          totalProducts={products.length}
        />

        <ProductGrid 
          products={products} 
          loading={loading} 
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalPages={totalPages}
        />

        <Footer />
      </main>
    </div>
  );
};

export default App;
