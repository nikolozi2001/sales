import { useState, useMemo } from 'react';
import { filterProductsByQuery, filterProductsByStore } from '../utils/helpers';

/**
 * Custom hook for managing product filters
 * @param {Array} products - Array of products to filter
 * @returns {Object} - Filtered products and filter controls
 */
export const useProductFilters = (products) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Apply store filter
    filtered = filterProductsByStore(filtered, selectedStore);
    
    // Apply search filter
    filtered = filterProductsByQuery(filtered, searchQuery);
    
    return filtered;
  }, [products, selectedStore, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStore(null);
  };

  return {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedStore,
    setSelectedStore,
    clearFilters,
    hasActiveFilters: searchQuery.trim() !== '' || selectedStore !== null
  };
};
