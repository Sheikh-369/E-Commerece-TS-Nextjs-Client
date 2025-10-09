'use client';
import React from 'react';
import Link from 'next/link';
import HeroSection from './components/home/hero-section/hero-section';
import ShopByCategory from './components/home/shop-by-category/shop-by-category';
import FeaturedProducts from './components/home/featured-products/featured-products';

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200">
      <HeroSection/>
      {/* Categories Grid */}
      <ShopByCategory/>
      {/* Featured Products */}
      <FeaturedProducts/>
      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-6">Get the latest deals and product updates in your inbox.</p>
          <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 focus:outline-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
