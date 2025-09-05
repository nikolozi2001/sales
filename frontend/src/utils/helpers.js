/**
 * Extract numeric price from price string
 * @param {string} priceStr - Price string like "25.50₾" or "25.50"
 * @returns {number} - Numeric price value
 */
export const extractPrice = (priceStr) => {
  if (!priceStr) return 0;
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

/**
 * Calculate discount percentage
 * @param {number} oldPrice - Original price
 * @param {number} newPrice - Discounted price
 * @returns {number} - Discount percentage
 */
export const calculateDiscountPercentage = (oldPrice, newPrice) => {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

/**
 * Format price with Georgian Lari symbol
 * @param {number} price - Price number
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  if (!price || price <= 0) return '';
  return `${price.toFixed(2)}₾`;
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Filter products by search query
 * @param {Array} products - Array of products
 * @param {string} query - Search query
 * @returns {Array} - Filtered products
 */
export const filterProductsByQuery = (products, query) => {
  if (!query.trim()) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(item => {
    const product = item.product;
    const title = (product.title || product.name || '').toLowerCase();
    return title.includes(searchTerm);
  });
};

/**
 * Filter products by store
 * @param {Array} products - Array of products
 * @param {string|null} storeId - Store ID to filter by
 * @returns {Array} - Filtered products
 */
export const filterProductsByStore = (products, storeId) => {
  if (!storeId) return products;
  return products.filter(item => item.store === storeId);
};
