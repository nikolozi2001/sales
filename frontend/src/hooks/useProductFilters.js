import { useState, useMemo } from 'react';
import { filterProductsByQuery, filterProductsByStore, extractPrice, calculateDiscountPercentage } from '../utils/helpers';

/**
 * Custom hook for managing advanced product filters
 * @param {Array} products - Array of products to filter
 * @returns {Object} - Filtered products and filter controls
 */
export const useProductFilters = (products) => {
  // Basic filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  
  // Advanced filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [discountRange, setDiscountRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc, discount-desc, name-asc
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);
  const [category, setCategory] = useState('all');

  // Get price and discount statistics
  const priceStats = useMemo(() => {
    if (!products || products.length === 0) return { min: 0, max: 1000 };
    
    const prices = products.map(product => {
      if (product.price) return extractPrice(product.price);
      if (product.newPrice) return extractPrice(product.newPrice);
      return 0;
    }).filter(price => price > 0);

    return {
      min: Math.floor(Math.min(...prices) || 0),
      max: Math.ceil(Math.max(...prices) || 1000)
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Apply store filter
    filtered = filterProductsByStore(filtered, selectedStore);
    
    // Apply search filter
    filtered = filterProductsByQuery(filtered, searchQuery);
    
    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.price ? extractPrice(product.price) : 
                   product.newPrice ? extractPrice(product.newPrice) : 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply discount filter
    filtered = filtered.filter(product => {
      const oldPrice = product.oldPrice ? extractPrice(product.oldPrice) : 0;
      const newPrice = product.price ? extractPrice(product.price) : 
                      product.newPrice ? extractPrice(product.newPrice) : 0;
      
      const discount = calculateDiscountPercentage(oldPrice, newPrice);
      return discount >= discountRange.min && discount <= discountRange.max;
    });

    // Apply "only discounted" filter
    if (showOnlyDiscounted) {
      filtered = filtered.filter(product => {
        const oldPrice = product.oldPrice ? extractPrice(product.oldPrice) : 0;
        const newPrice = product.price ? extractPrice(product.price) : 
                        product.newPrice ? extractPrice(product.newPrice) : 0;
        return calculateDiscountPercentage(oldPrice, newPrice) > 0;
      });
    }

    // Apply category filter (basic implementation based on product names)
    if (category !== 'all') {
      const categoryKeywords = getCategoryKeywords(category);
      filtered = filtered.filter(product => {
        const title = (product.title || product.name || '').toLowerCase();
        return categoryKeywords.some(keyword => title.includes(keyword));
      });
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': {
          const priceA = a.price ? extractPrice(a.price) : extractPrice(a.newPrice || '0');
          const priceB = b.price ? extractPrice(b.price) : extractPrice(b.newPrice || '0');
          return priceA - priceB;
        }
        
        case 'price-desc': {
          const priceA2 = a.price ? extractPrice(a.price) : extractPrice(a.newPrice || '0');
          const priceB2 = b.price ? extractPrice(b.price) : extractPrice(b.newPrice || '0');
          return priceB2 - priceA2;
        }
        
        case 'discount-desc': {
          const discountA = calculateDiscountPercentage(
            extractPrice(a.oldPrice || '0'),
            a.price ? extractPrice(a.price) : extractPrice(a.newPrice || '0')
          );
          const discountB = calculateDiscountPercentage(
            extractPrice(b.oldPrice || '0'),
            b.price ? extractPrice(b.price) : extractPrice(b.newPrice || '0')
          );
          return discountB - discountA;
        }
        
        case 'name-asc': {
          const nameA = (a.title || a.name || '').toLowerCase();
          const nameB = (b.title || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        }
        
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [products, selectedStore, searchQuery, priceRange, discountRange, sortBy, showOnlyDiscounted, category]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStore(null);
    setPriceRange({ min: priceStats.min, max: priceStats.max });
    setDiscountRange({ min: 0, max: 100 });
    setSortBy('default');
    setShowOnlyDiscounted(false);
    setCategory('all');
  };

  const hasActiveFilters = searchQuery.trim() !== '' || 
                          selectedStore !== null || 
                          priceRange.min !== priceStats.min || 
                          priceRange.max !== priceStats.max ||
                          discountRange.min !== 0 || 
                          discountRange.max !== 100 ||
                          sortBy !== 'default' ||
                          showOnlyDiscounted ||
                          category !== 'all';

  return {
    filteredProducts,
    // Basic filters
    searchQuery,
    setSearchQuery,
    selectedStore,
    setSelectedStore,
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
    // Utils
    clearFilters,
    hasActiveFilters,
    priceStats
  };
};

// Helper function to get category keywords
const getCategoryKeywords = (category) => {
  const categoryMap = {
    'dairy': ['რძე', 'ყველი', 'იოგურტი', 'კრემი', 'ნაღები', 'მაცონი'],
    'meat': ['ხორცი', 'ღორი', 'ქათამი', 'ძროხა', 'კურდღელი', 'თევზი'],
    'bread': ['პური', 'ბაგეტი', 'ლავაში', 'ნამცხვარი', 'კეკსი'],
    'fruits': ['ხილი', 'ვაშლი', 'ყურძნები', 'ბანანი', 'ციტრუსი', 'ატამი'],
    'vegetables': ['ბოსტნეული', 'კარტოფილი', 'პომიდორი', 'კიტრი', 'ხახვი', 'ნიორი'],
    'beverages': ['სასმელი', 'წყალი', 'ლუდი', 'ღვინო', 'ჩაი', 'ყავა', 'წვენი'],
    'household': ['საყოფაცხოვრებო', 'სარეცხი', 'საწმენდი', 'ქაღალდი', 'პაკეტი']
  };
  
  return categoryMap[category] || [];
};
