'use client'

import { useEffect, useRef, useState } from "react";
import CarouselOverlay from "../products-overlay/carousal-overlay";

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1032&auto=format&fit=crop",
    alt: "Cart with cartoons.",
  },
  {
    url: "https://images.unsplash.com/photo-1594966392038-1a34ee7f0a4b?q=80&w=870&auto=format&fit=crop",
    alt: "Multiple pairs of cosmetics lined up on shelves",
  },
  {
    url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    alt: "Variety of beauty products and cosmetics",
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    alt: "Assortment of watches and jewelry",
  },
];
export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 3500;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => resetTimeout();
  }, [current]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="overflow-hidden rounded-3xl shadow-lg relative">
        <CarouselOverlay/>
        <div
          className="flex transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselImages.map(({ url, alt }, index) => (
            <img
              key={index}
              src={url}
              alt={alt}
              className="w-full flex-shrink-0 object-cover h-40 sm:h-56 md:h-64 rounded-3xl"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 right-8 flex space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "bg-indigo-600 rounded-lg w-8 h-2"
                  : "bg-indigo-300 rounded-full w-2.5 h-2.5 md:w-3 md:h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}