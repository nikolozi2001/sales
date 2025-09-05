import React from 'react';
import StoreSwitcher from './StoreSwitcher';
import SearchBar from './SearchBar';

const Header = ({ onSearch, selectedStore, setSelectedStore }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <h1 className="text-lg font-semibold">ფასდაკლებები საქართველოს მაღაზიებში</h1>
                <p className="text-xs text-gray-500">მაღაზიები: ნიკორა, 2 ნაბიჯი</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-4">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="flex items-center gap-3">
            <StoreSwitcher selected={selectedStore} setSelected={setSelectedStore} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
