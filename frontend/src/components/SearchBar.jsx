import React, { useState, useEffect } from 'react';
import { showInfoToast } from '../utils/toast';

const SearchBar = ({ onSearch, placeholder = "ძებნა პროდუქტებში..." }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  // Show search info after typing
  useEffect(() => {
    if (searchValue.trim() && searchValue.length > 2) {
      const timeoutId = setTimeout(() => {
        showInfoToast(`მოძებნა: "${searchValue}"`);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchValue]);

  return (
    <label className="relative block">
      <span className="sr-only">Search products</span>
      <input
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="placeholder:italic placeholder:text-gray-400 block bg-gray-50 w-full border border-gray-200 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all duration-200"
        placeholder={placeholder}
        type="text"
        name="search"
      />
      <svg 
        className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" 
        />
      </svg>
    </label>
  );
};

export default SearchBar;
