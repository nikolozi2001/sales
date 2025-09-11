import React, { useEffect, useState } from "react";
import "./App.css";

// Components
import {
  Header,
  Footer,
  ProductGrid,
  FilterPanel,
  QuickFilters,
  FavoritesSection,
  QuickActionsMenu,
  ProductComparisonModal,
} from "./components";

// Hooks
import { useProducts } from "./hooks";

// Toast utilities
import { showErrorToast, showSuccessToast, showProductToast, toastMessages } from "./utils/toast";

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
    isFiltering,
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    favoritesCount,
  } = useProducts();

  // Selection state for bulk operations
  const [showSelection, setShowSelection] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

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
      console.error("Refresh failed:", err);
      showErrorToast(toastMessages.error.networkError);
    }
  };

  // Selection handlers
  const handleSelectionChange = (product, store, isSelected) => {
    if (isSelected) {
      // Check if already selected to avoid duplicates
      const alreadySelected = selectedProducts.some(
        selected => {
          if (store === "2nabiji") {
            return selected.store === store && selected.product.title === product.title;
          } else {
            return selected.store === store && (selected.product.link === product.link || selected.product.name === product.name);
          }
        }
      );
      if (!alreadySelected) {
        setSelectedProducts(prev => [...prev, { product, store }]);
      }
    } else {
      setSelectedProducts(prev => prev.filter(
        selected => {
          if (store === "2nabiji") {
            return !(selected.store === store && selected.product.title === product.title);
          } else {
            return !(selected.store === store && (selected.product.link === product.link || selected.product.name === product.name));
          }
        }
      ));
    }
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
    setShowSelection(false);
  };

  // Bulk operations
  const handleBulkAddToCart = (products) => {
    products.forEach(item => {
      showProductToast("addToCart", item.product.title || item.product.name || "პროდუქტი");
    });
    showSuccessToast(`${products.length} პროდუქტი დაემატა კალათაში`);
  };

  const handleCompare = (products) => {
    setComparisonProducts(products);
    setShowComparison(true);
  };

  const handleShare = (products) => {
    const shareText = products.map(item => {
      const title = item.store === "2nabiji" ? item.product.title : item.product.name;
      return `• ${title}`;
    }).join('\n');

    const fullText = `გაუზიარე ეს პროდუქტები:\n${shareText}`;

    if (navigator.share) {
      navigator.share({
        title: 'პროდუქტების სია',
        text: fullText,
      });
    } else {
      navigator.clipboard.writeText(fullText).then(() => {
        showSuccessToast('სია დაკოპირდა კლიპბორდში');
      });
    }
  };

  const handleToggleSelection = () => {
    const newShowSelection = !showSelection;
    setShowSelection(newShowSelection);
    if (!newShowSelection) {
      // Clear selection when disabling selection mode
      setSelectedProducts([]);
    }
  };

  const handleExportFavorites = () => {
    const csvContent = [
      ['სახელი', 'მაღაზია', 'ახალი ფასი', 'ძველი ფასი', 'დამატების თარიღი'],
      ...favorites.map(fav => [
        fav.title || fav.name || '',
        fav.store,
        fav.newPrice || fav.price || '',
        fav.oldPrice || '',
        fav.addedAt || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `favorites_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    showSuccessToast('ფავორიტები ექსპორტირდა CSV ფაილში');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800">
      <Header
        onSearch={setSearchQuery}
        selectedStore={selectedStore}
        searchQuery={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          onRefresh={handleRefresh}
          showSelection={showSelection}
          onToggleSelection={handleToggleSelection}
        />

        <FavoritesSection
          favorites={favorites}
          removeFavorite={removeFavorite}
          loading={loading}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showSelection={showSelection}
          selectedProducts={selectedProducts}
          onSelectionChange={handleSelectionChange}
        />

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalPages={totalPages}
          isFiltering={isFiltering}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showSelection={showSelection}
          selectedProducts={selectedProducts}
          onSelectionChange={handleSelectionChange}
        />

        <Footer />
      </main>

      {/* Quick Actions Menu */}
      <QuickActionsMenu
        selectedProducts={selectedProducts}
        onClearSelection={handleClearSelection}
        onBulkAddToCart={handleBulkAddToCart}
        onCompare={handleCompare}
        onShare={handleShare}
        onExportFavorites={handleExportFavorites}
        favoritesCount={favoritesCount}
        showSelection={showSelection}
      />

      {/* Product Comparison Modal */}
      {showComparison && (
        <ProductComparisonModal
          products={comparisonProducts}
          onClose={() => setShowComparison(false)}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};

export default App;
