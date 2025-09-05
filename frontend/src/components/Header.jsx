import React from "react";
import StoreSwitcher from "./StoreSwitcher";
import SearchBar from "./SearchBar";

const Header = ({ onSearch, selectedStore, setSelectedStore }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
              G
            </div>
            <span className="text-base font-semibold text-gray-800">
              ფასდაკლებები
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg px-4">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Store Switcher */}
          <div className="flex items-center gap-2">
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
