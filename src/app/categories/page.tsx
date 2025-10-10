'use client';

import React from 'react';
import Carousel from '../components/categories/carousal/carousal';
import Title from '../components/categories/heading/heading';
import Drinks from '../components/categories/drinks/drinks';
import Electronics from '../components/categories/electronics/electronics';
import Clothing from '../components/categories/clothing/clothing';
import Groceries from '../components/categories/groceries/groceries';
import HomeEssentials from '../components/categories/home essentials/home-essentials';
import Fashion from '../components/categories/fashion/fashion';

function Categories() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 flex flex-col items-center justify-start px-4 py-8">
        <Title/>
        <Carousel />
        <Drinks/>
        <Electronics/>
        <Clothing/>
        <Groceries/>
        <HomeEssentials/>
        <Fashion/>
    </main>
  );
}

export default Categories;
