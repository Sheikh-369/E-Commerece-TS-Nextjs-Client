'use client'
import React from "react";

interface SearchBarProps {
  value?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value = "", onSearch, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)} // ✅ this is key
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
