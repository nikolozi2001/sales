import { useState, useEffect, useMemo } from 'react';
import { fetchAllProducts } from '../services/api';
import { LOADING_STATES } from '../constants';
import { useProductFilters } from './useProductFilters';

const PRODUCTS_PER_PAGE = 24;

/**
 * Custom hook for fetching and managing products data with filtering and pagination
 * @returns {Object} - Products data, loading state, error, refresh function, and pagination controls
 */
export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]); // Renamed to allProducts
  const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Integrate product filtering
  const {
    filteredProducts,
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
  } = useProductFilters(allProducts);

  const fetchProducts = async () => {
    setLoadingState(LOADING_STATES.LOADING);
    setError(null);
    
    try {
      const data = await fetchAllProducts();
      setAllProducts(data);
      setLoadingState(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(err.message);
      setLoadingState(LOADING_STATES.ERROR);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStore, priceRange, discountRange, sortBy, showOnlyDiscounted]);

  const refresh = () => {
    fetchProducts();
  };

  // Pagination logic
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  }, [filteredProducts]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  return {
    products: paginatedProducts, // Now returns paginated products
    allProducts, // Keep allProducts for other potential uses if needed
    loading: loadingState === LOADING_STATES.LOADING,
    error,
    refresh,
    loadingState,
    // Filter-related exports
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
    // Pagination-related exports
    currentPage,
    setCurrentPage,
    productsPerPage: PRODUCTS_PER_PAGE,
    totalPages,
  };
};
