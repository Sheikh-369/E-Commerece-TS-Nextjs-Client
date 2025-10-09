'use client';
import React from 'react';
import Link from 'next/link';
import HeroSection from './components/home/hero-section/hero-section';
import ShopByCategory from './components/home/shop-by-category/shop-by-category';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection/>
      {/* Categories Grid */}
      <ShopByCategory/>
      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Product"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-sm">
                  <p className="font-semibold">Product Name</p>
                  <p className="text-gray-600">Rs. 1999</p>
                  <Link href="/product-detail/1">
                    <button className="mt-2 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 text-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-50 py-16">
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
