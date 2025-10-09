"use client";
import Link from "next/link";
import React from "react";

const categories = [
  {
    name: "Electronics",
    image: "/home/hero/images/electronics.avif",
    href: "/categories/electronics",
  },
  {
    name: "Fashion",
    image: "/home/hero/images/fashion.avif",
    href: "/categories/fashion",
  },
  {
    name: "Home Essentials",
    image: "/home/hero/images/home-appliances.avif",
    href: "/categories/home",
  },
  {
    name: "Beauty",
    image: "/home/hero/images/beauty.avif",
    href: "/categories/beauty",
  },
  {
    name: "Drinks",
    image: "/home/hero/images/drinks.avif",
    href: "/categories/drinks",
  },
  {
    name: "Groceries",
    image: "/home/hero/images/grocery.avif",
    href: "/categories/groceries",
  },
  {
    name: "Clothing",
    image: "/home/hero/images/clothing.avif",
    href: "/categories/clothing",
  },
  {
    name: "Hardwares",
    image: "/home/hero/images/hardware.avif",
    href: "/categories/hardwares",
  },
  {
    name: "Books",
    image: "/home/hero/images/books.avif",
    href: "/categories/books",
  },
  {
    name: "Gadgets",
    image: "/home/hero/images/gadgets.avif",
    href: "/categories/gadgets",
  },
  {
    name: "Foods",
    image: "/home/hero/images/food.avif",
    href: "/categories/foods",
  },
  {
    name: "Furnitures",
    image: "/home/hero/images/furnitures.avif",
    href: "/categories/furnitures",
  },
  
];

function CategoriesSection() {
  return (
    <section className="w-[90%] mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            <div className="overflow-hidden rounded-lg shadow-md bg-pink-100 transition-transform group-hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-30 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold text-gray-800">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
