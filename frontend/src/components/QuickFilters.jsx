import React from 'react';
import { SORT_OPTIONS, DISCOUNT_RANGES, STORES } from '../constants';
import { showInfoToast } from '../utils/toast';

const QuickFilters = ({
  sortBy,
  setSortBy,
  showOnlyDiscounted,
  setShowOnlyDiscounted,
  setDiscountRange,
  selectedStore,
  setSelectedStore,
  clearFilters,
  hasActiveFilters
}) => {
  const handleQuickSort = (value) => {
    setSortBy(value);
    const option = SORT_OPTIONS.find(opt => opt.value === value);
    showInfoToast(`${option?.icon} ${option?.label}`);
  };

  const handleQuickDiscount = (range) => {
    setDiscountRange(range);
    showInfoToast(`🔥 ${range.label} ფასდაკლება`);
  };

  const handleToggleDiscounted = () => {
    setShowOnlyDiscounted(!showOnlyDiscounted);
    showInfoToast(showOnlyDiscounted ? 'ყველა პროდუქტი' : '🔥 მხოლოდ ფასდაკლებული');
  };

  const handleStoreChange = (storeId) => {
    setSelectedStore(storeId);
    const store = STORES.find(s => s.id === storeId);
    showInfoToast(`🏪 ${store?.name || 'ყველა მაღაზია'}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 lg:hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-800">სწრაფი ფილტრები</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-red-600 border border-red-200 px-2 py-1 rounded-md hover:bg-red-50"
          >
            გასუფთავება
          </button>
        )}
      </div>

      {/* Quick Store Filter */}
      <div className="mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleStoreChange(null)}
            className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg border transition-all ${
              selectedStore === null
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🏪 ყველა მაღაზია
          </button>
          
          {STORES.map((store) => (
            <button
              key={store.id}
              onClick={() => handleStoreChange(store.id)}
              className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg border transition-all ${
                selectedStore === store.id
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {store.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Sort */}
      <div className="mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {SORT_OPTIONS.slice(0, 4).map((option) => (
            <button
              key={option.value}
              onClick={() => handleQuickSort(option.value)}
              className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg border transition-all ${
                sortBy === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="mr-1">{option.icon}</span>
              {option.label.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Discount Filters */}
      <div className="mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={handleToggleDiscounted}
            className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg border transition-all ${
              showOnlyDiscounted
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🔥 ფასდაკლებული
          </button>
          
          {DISCOUNT_RANGES.slice(1, 4).map((range, index) => (
            <button
              key={index}
              onClick={() => handleQuickDiscount(range)}
              className="flex-shrink-0 px-3 py-2 text-xs rounded-lg border border-gray-200 hover:border-gray-300"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;
