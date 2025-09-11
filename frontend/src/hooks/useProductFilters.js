import { useState, useMemo } from "react";
import {
  filterProductsByStore,
  extractPrice,
  calculateDiscountPercentage,
  fuzzyMatch,
} from "../utils/helpers";

/**
 * Custom hook for managing product favorites
 * @returns {Object} - Favorites state and functions
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('productFavorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (product, store) => {
    // Generate unique key based on store-specific product identifier
    let productIdentifier;
    if (store === "2nabiji") {
      productIdentifier = product.title;
    } else {
      productIdentifier = product.link || product.name;
    }
    const productKey = `${store}-${productIdentifier}`;
    
    setFavorites(prev => {
      const isFav = prev.some(fav => fav.key === productKey);
      let newFavs;
      
      if (isFav) {
        newFavs = prev.filter(fav => fav.key !== productKey);
      } else {
        newFavs = [...prev, {
          ...product,
          store,
          key: productKey,
          addedAt: new Date().toISOString()
        }];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('productFavorites', JSON.stringify(newFavs));
      }
      return newFavs;
    });
  };

  const isFavorite = (product, store) => {
    // Generate unique key based on store-specific product identifier
    let productIdentifier;
    if (store === "2nabiji") {
      productIdentifier = product.title;
    } else {
      productIdentifier = product.link || product.name;
    }
    const productKey = `${store}-${productIdentifier}`;
    return favorites.some(fav => fav.key === productKey);
  };

  const removeFavorite = (productKey) => {
    setFavorites(prev => {
      const newFavs = prev.filter(fav => fav.key !== productKey);
      if (typeof window !== 'undefined') {
        localStorage.setItem('productFavorites', JSON.stringify(newFavs));
      }
      return newFavs;
    });
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    favoritesCount: favorites.length
  };
};

/**
 * Custom hook for managing advanced product filters
 * @param {Array} products - Array of products to filter
 * @returns {Object} - Filtered products and filter controls
 */
export const useProductFilters = (products) => {
  // Basic filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  // Advanced filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [discountRange, setDiscountRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc, discount-desc, name-asc
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

  // Get price and discount statistics
  const priceStats = useMemo(() => {
    if (!products || products.length === 0) return { min: 0, max: 1000 };

    const prices = products
      .map((product) => {
        if (product.price) return extractPrice(product.price);
        if (product.newPrice) return extractPrice(product.newPrice);
        return 0;
      })
      .filter((price) => price > 0);

    if (prices.length === 0) return { min: 0, max: 1000 };

    return {
      min: Math.floor(Math.min(...prices) || 0),
      max: Math.ceil(Math.max(...prices) || 1000),
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply store filter
    filtered = filterProductsByStore(filtered, selectedStore);

    // Apply search filter
    filtered = filtered.filter((item) => {
      const product = item.product;
      const title = product.title || product.name || "";
      return fuzzyMatch(title, searchQuery);
    });

    // Apply price range filter
    filtered = filtered.filter((item) => {
      const price = item.product.price
        ? extractPrice(item.product.price)
        : item.product.newPrice
        ? extractPrice(item.product.newPrice)
        : 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply discount filter
    filtered = filtered.filter((item) => {
      const oldPrice = item.product.oldPrice ? extractPrice(item.product.oldPrice) : 0;
      const newPrice = item.product.price
        ? extractPrice(item.product.price)
        : item.product.newPrice
        ? extractPrice(item.product.newPrice)
        : 0;

      const discount = calculateDiscountPercentage(oldPrice, newPrice);
      
      // Apply "show only discounted" filter
      if (showOnlyDiscounted && discount === 0) {
        return false;
      }

      return discount >= discountRange.min && discount <= discountRange.max;
    });

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc": {
          const priceA = a.product.price
            ? extractPrice(a.product.price)
            : extractPrice(a.product.newPrice || "0");
          const priceB = b.product.price
            ? extractPrice(b.product.price)
            : extractPrice(b.product.newPrice || "0");
          return priceA - priceB;
        }

        case "price-desc": {
          const priceA2 = a.product.price
            ? extractPrice(a.product.price)
            : extractPrice(a.product.newPrice || "0");
          const priceB2 = b.product.price
            ? extractPrice(b.product.price)
            : extractPrice(b.product.newPrice || "0");
          return priceB2 - priceA2;
        }

        case "discount-desc": {
          const discountA = calculateDiscountPercentage(
            extractPrice(a.product.oldPrice || "0"),
            a.product.price ? extractPrice(a.product.price) : extractPrice(a.product.newPrice || "0")
          );
          const discountB = calculateDiscountPercentage(
            extractPrice(b.product.oldPrice || "0"),
            b.product.price ? extractPrice(b.product.price) : extractPrice(b.product.newPrice || "0")
          );
          return discountB - discountA;
        }

        case "name-asc": {
          const nameA = (a.product.title || a.product.name || "").toLowerCase();
          const nameB = (b.product.title || b.product.name || "").toLowerCase();
          return nameA.localeCompare(nameB);
        }

        default:
          return 0;
      }
    });

    return filtered;
  }, [
    products,
    selectedStore,
    searchQuery,
    priceRange,
    discountRange,
    sortBy,
    showOnlyDiscounted,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStore(null);
    setPriceRange({ min: priceStats.min, max: priceStats.max });
    setDiscountRange({ min: 0, max: 100 });
    setSortBy("default");
    setShowOnlyDiscounted(false);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedStore !== null ||
    priceRange.min !== priceStats.min ||
    priceRange.max !== priceStats.max ||
    discountRange.min !== 0 ||
    discountRange.max !== 100 ||
    sortBy !== "default" ||
    showOnlyDiscounted;

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
    // Utils
    clearFilters,
    hasActiveFilters,
    priceStats,
  };
};
