import React from "react";

const StatsBar = ({ totalProducts, selectedStore, onRefresh, sortBy }) => {
  const getActiveFilterText = () => {
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
  };

  const activeFilters = getActiveFilterText();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">ფასდაკლებები</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <p className="text-sm text-gray-500">
              {totalProducts} პროდუქტი მოიძებნა
            </p>

            {activeFilters.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs text-gray-400">•</span>
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
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
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
