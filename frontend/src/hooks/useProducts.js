import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../services/api';
import { LOADING_STATES } from '../constants';

/**
 * Custom hook for fetching and managing products data
 * @returns {Object} - Products data, loading state, error, and refresh function
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoadingState(LOADING_STATES.LOADING);
    setError(null);
    
    try {
      const data = await fetchAllProducts();
      setProducts(data);
      setLoadingState(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(err.message);
      setLoadingState(LOADING_STATES.ERROR);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refresh = () => {
    fetchProducts();
  };

  return {
    products,
    loading: loadingState === LOADING_STATES.LOADING,
    error,
    refresh,
    loadingState
  };
};
