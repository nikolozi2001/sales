import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { SORT_OPTIONS, PRICE_RANGES, DISCOUNT_RANGES } from "../constants";
import { showInfoToast } from "../utils/toast";
import StoreSwitcher from "./StoreSwitcher";

const FilterPanel = ({
  priceRange,
  setPriceRange,
  discountRange,
  setDiscountRange,
  sortBy,
  setSortBy,
  selectedStore,
  setSelectedStore,
  clearFilters,
  hasActiveFilters,
  priceStats,
  totalProducts,
  onRefresh,
  showSelection = false,
  onToggleSelection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced price range update
  const debounceTimeoutRef = useRef(null);

  const debouncedSetPriceRange = useCallback(
    (newRange) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        setPriceRange(newRange);
      }, 300); // 300ms debounce
    },
    [setPriceRange]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const activeFilters = useMemo(() => {
    const filters = [];

    if (selectedStore) {
      filters.push(selectedStore === "2nabiji" ? "2 ნაბიჯი" : "ნიკორა");
    }

    if (sortBy && sortBy !== "default") {
      const sortLabels = {
        "price-asc": "ფასი ⬆",
        "price-desc": "ფასი ⬇",
        "discount-desc": "ფასდაკლება ⬇",
        "name-asc": "სახელი A-Z",
      };
      filters.push(sortLabels[sortBy] || sortBy);
    }

    return filters;
  }, [selectedStore, sortBy]);

  const handlePriceRangeSelect = (range) => {
    const defaultMin = 0;
    const defaultMax = 1000;

    const resetRange = {
      min: Number.isFinite(priceStats.min) ? priceStats.min : defaultMin,
      max: Number.isFinite(priceStats.max) ? priceStats.max : defaultMax,
    };

    if (priceRange.min === range.min && priceRange.max === range.max) {
      setPriceRange(resetRange);
      showInfoToast("ფასის ფილტრი გასუფთავებულია");
    } else {
      setPriceRange(range);
      showInfoToast(`ფასის ფილტრი: ${range.min}-${range.max} ლარი`);
    }
  };

  const handleDiscountRangeSelect = (range) => {
    if (discountRange.min === range.min && discountRange.max === range.max) {
      setDiscountRange({ min: 0, max: 100 });
      showInfoToast("ფასდაკლების ფილტრი გასუფთავებულია");
    } else {
      setDiscountRange(range);
      showInfoToast(`ფასდაკლების ფილტრი: ${range.min}%-${range.max}%`);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const option = SORT_OPTIONS.find((opt) => opt.value === value);
    showInfoToast(`დალაგება: ${option?.label}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">🔍</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              ფასდაკლებები
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-100">
                {totalProducts}
              </span>
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <p className="text-sm text-gray-500">
                {totalProducts} პროდუქტი მოიძებნა
              </p>
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {activeFilters.map((filter, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-medium shadow-sm"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSelection && onToggleSelection()}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
              showSelection
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showSelection ? "გათიშვა" : "არჩევა"}
          </button>
          <button
            onClick={onRefresh}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            განახლება
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all"
            >
              გასუფთავება
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-5 space-y-6">
          {/* Store Switcher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              მაღაზია
            </label>
            <div className="flex justify-center">
              <StoreSwitcher
                selected={selectedStore}
                setSelected={setSelectedStore}
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              დალაგება
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    handleSortChange(
                      option.value === sortBy ? "default" : option.value
                    )
                  }
                  className={`p-3 text-left rounded-xl border text-sm font-medium transition-all ${
                    sortBy === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ფასის დიაპაზონი
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {PRICE_RANGES.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handlePriceRangeSelect(range)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    priceRange.min === range.min && priceRange.max === range.max
                      ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Custom Price Inputs */}
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="მინ"
                value={priceRange.min}
                onChange={(e) =>
                  debouncedSetPriceRange({
                    ...priceRange,
                    min: Number(e.target.value),
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="მაქს"
                value={priceRange.max}
                onChange={(e) =>
                  debouncedSetPriceRange({
                    ...priceRange,
                    max: Number(e.target.value),
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ფასების დიაპაზონი: {priceStats.min}-{priceStats.max} ₾
            </p>
          </div>

          {/* Discount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ფასდაკლების დიაპაზონი
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {DISCOUNT_RANGES.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleDiscountRangeSelect(range)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    discountRange.min === range.min &&
                    discountRange.max === range.max
                      ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
