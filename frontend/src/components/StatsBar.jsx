import React from 'react';

const StatsBar = ({ 
  totalProducts, 
  selectedStore, 
  hasActiveFilters, 
  onClearFilters, 
  onRefresh 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">ფასდაკლებები</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalProducts} პროდუქტი მოიძებნა
            {selectedStore && (
              <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                {selectedStore === '2nabiji' ? '2 ნაბიჯი' : 'ნიკორა'}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button 
              onClick={onClearFilters}
              className="px-3 py-1.5 rounded-md border bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ფილტრების გასუფთავება
            </button>
          )}
          
          <button 
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-md border bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            განახლება
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
