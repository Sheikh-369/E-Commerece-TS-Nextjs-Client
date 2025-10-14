'use client';

import React, { useState } from 'react';
import Carousel from '../components/categories/carousal/carousal';
import Title from '../components/categories/heading/heading';
import Drinks from '../components/categories/drinks/drinks';
import Electronics from '../components/categories/electronics/electronics';
import Clothing from '../components/categories/clothing/clothing';
import Groceries from '../components/categories/groceries/groceries';
import HomeEssentials from '../components/categories/home essentials/home-essentials';
import Fashion from '../components/categories/fashion/fashion';
import SearchBar from '../components/searchbar/searchbar'; // Import the search bar

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle the search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 flex flex-col items-center justify-start px-4 py-8">
      
      <Title />
      <Carousel />
          {/* Search Bar with space from carousel */}
      <div className="mt-6 w-full max-w-md mx-auto sticky top-24 z-15 bg-blue-50">
        <SearchBar value={searchQuery} onSearch={handleSearch} placeholder="Search categories..." />
      </div>
      {/* Only render categories if they match the search query */}
      {(!searchQuery || (searchQuery && 'drinks'.includes(searchQuery.toLowerCase()))) && <Drinks />}
      {(!searchQuery || (searchQuery && 'electronics'.includes(searchQuery.toLowerCase()))) && <Electronics />}
      {(!searchQuery || (searchQuery && 'clothing'.includes(searchQuery.toLowerCase()))) && <Clothing />}
      {(!searchQuery || (searchQuery && 'groceries'.includes(searchQuery.toLowerCase()))) && <Groceries />}
      {(!searchQuery || (searchQuery && 'home essentials'.includes(searchQuery.toLowerCase()))) && <HomeEssentials />}
      {(!searchQuery || (searchQuery && 'fashion'.includes(searchQuery.toLowerCase()))) && <Fashion />}
    </main>
  );
}

export default Categories;
