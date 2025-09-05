import { API_BASE_URL, STORES } from '../constants';

/**
 * Fetch products from a specific store endpoint
 * @param {Object} store - Store configuration object
 * @returns {Promise<Array>} - Array of products with store info
 */
const fetchStoreProducts = async (store) => {
  try {
    const response = await fetch(`${API_BASE_URL}${store.endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${store.name}: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map(product => ({ store: store.id, product }));
  } catch (error) {
    console.error(`Error fetching from ${store.name}:`, error);
    throw error;
  }
};

/**
 * Fetch products from all stores
 * @returns {Promise<Array>} - Array of all products
 */
export const fetchAllProducts = async () => {
  try {
    const promises = STORES.map(store => 
      fetchStoreProducts(store).catch(error => {
        console.warn(`Failed to fetch from ${store.name}:`, error.message);
        return []; // Return empty array for failed requests
      })
    );

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products from stores');
  }
};

/**
 * Fetch products from a specific store
 * @param {string} storeId - Store ID
 * @returns {Promise<Array>} - Array of products from specific store
 */
export const fetchStoreProductsById = async (storeId) => {
  const store = STORES.find(s => s.id === storeId);
  
  if (!store) {
    throw new Error(`Store with ID ${storeId} not found`);
  }
  
  return fetchStoreProducts(store);
};

/**
 * Health check for API
 * @returns {Promise<boolean>} - API health status
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
