// components/products/products-intro.tsx
'use client'

import React from 'react'

export default function ProductsIntro() {
  return (
    <div className="text-center mb-10 animate-fade-in-up">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 transition-colors duration-700">
        Explore Our Latest Collection
      </h2>
      <p className="mt-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 transition-opacity duration-1000 opacity-90">
        Find the perfect picks from our curated range of products — fashion, beauty, gadgets, and more. Carefully selected, just for you.
      </p>
    </div>
  )
}
