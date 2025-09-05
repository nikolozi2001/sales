import React from "react";
import SearchBar from "./SearchBar";

const Header = ({ onSearch, selectedStore, searchQuery }) => {
  const getStoreDisplay = () => {
    if (!selectedStore) return "ყველა მაღაზია";
    return selectedStore === '2nabiji' ? '2 ნაბიჯი' : 'ნიკორა';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200/50">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                ფასდაკლებები
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {getStoreDisplay()}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl px-6">
            <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
          </div>

          {/* Right side indicator */}
          <div className="flex items-center gap-3">
            {selectedStore && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  selectedStore === '2nabiji' ? 'bg-sky-600' : 'bg-emerald-600'
                }`}></div>
                <span className="text-sm font-medium text-emerald-700">
                  {getStoreDisplay()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
