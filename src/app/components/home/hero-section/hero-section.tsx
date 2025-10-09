"use client";
import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";

// Use Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

function HeroSection() {
  return (
    <div className={`flex items-center justify-center w-full mt-10 ${inter.className}`}>
      <section className="relative text-white py-20 text-center rounded overflow-hidden w-[90%]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-blue-500 z-0 bg-blend-overlay"
          style={{
            backgroundImage: "url('/home/hero/images/hero-section.avif')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow">
            Discover the Best Products Online
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Shop electronics, fashion, home essentials, and more.
          </p>
          <Link href="/categories">
            <button className="bg-blue-300 text-white-500 font-semibold px-6 py-3 rounded hover:bg-blue-400 transition">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
