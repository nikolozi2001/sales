import React from "react";
import StoreSwitcher from "./StoreSwitcher";
import SearchBar from "./SearchBar";

const Header = ({ onSearch, selectedStore, setSelectedStore }) => {
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
                საქართველოს მაღაზიები
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl px-6">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Store Switcher */}
          <div className="flex items-center gap-3">
            <StoreSwitcher
              selected={selectedStore}
              setSelected={setSelectedStore}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
