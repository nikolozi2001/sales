import React, { useState } from 'react';
import { SORT_OPTIONS, CATEGORY_OPTIONS, PRICE_RANGES, DISCOUNT_RANGES } from '../constants';
import { showInfoToast } from '../utils/toast';

const FilterPanel = ({
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
  clearFilters,
  hasActiveFilters,
  priceStats,
  totalProducts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceRangeSelect = (range) => {
    setPriceRange(range);
    showInfoToast(`ფასის ფილტრი: ${range.min}-${range.max} ლარი`);
  };

  const handleDiscountRangeSelect = (range) => {
    setDiscountRange(range);
    showInfoToast(`ფასდაკლების ფილტრი: ${range.min}%-${range.max}%`);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const option = SORT_OPTIONS.find(opt => opt.value === value);
    showInfoToast(`დალაგება: ${option?.label}`);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    const option = CATEGORY_OPTIONS.find(opt => opt.value === value);
    showInfoToast(`კატეგორია: ${option?.label}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🔍</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">ფილტრები</h3>
            <p className="text-sm text-gray-500">
              {totalProducts} პროდუქტი
              {hasActiveFilters && ' • ფილტრები აქტიურია'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              გასუფთავება
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              დალაგება
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`p-3 text-left rounded-xl border text-sm transition-all ${
                    sortBy === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              კატეგორია
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {CATEGORY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCategoryChange(option.value)}
                  className={`p-3 text-left rounded-xl border text-sm transition-all ${
                    category === option.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            {/* Custom Price Range */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="მინ"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="მაქს"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ფასების დიაპაზონი: {priceStats.min}-{priceStats.max} ლარი
            </p>
          </div>

          {/* Discount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ფასდაკლების დიაპაზონი
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {DISCOUNT_RANGES.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleDiscountRangeSelect(range)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    discountRange.min === range.min && discountRange.max === range.max
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              დამატებითი ფილტრები
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={showOnlyDiscounted}
                  onChange={(e) => setShowOnlyDiscounted(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-medium">მხოლოდ ფასდაკლებული პროდუქტები</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
