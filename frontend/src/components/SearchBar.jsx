import React, { useEffect } from "react";
import { showInfoToast } from "../utils/toast";

const SearchBar = ({
  searchQuery,
  onSearch,
  placeholder = "ძებნა პროდუქტებში...",
}) => {
  // Show search info after typing
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        showInfoToast(`მოძებნა: "${searchQuery}"`);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  return (
    <label className="relative block">
      <span className="sr-only">Search products</span>
      <input
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm shadow-sm placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition-all"
        placeholder={placeholder}
        type="text"
        name="search"
      />
      <svg
        className="w-5 h-5 text-gray-400 absolute right-3 top-3 pointer-events-none"
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
