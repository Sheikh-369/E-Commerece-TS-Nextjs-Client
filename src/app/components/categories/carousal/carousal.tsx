'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/categories/carousal/images/image1.png',
  '/categories/carousal/images/image2.png',
  '/categories/carousal/images/image3.jpg',
  '/categories/carousal/images/image4.jpg',
  '/categories/carousal/images/image5.jpg',
  '/categories/carousal/images/image6.jpg',
  '/categories/carousal/images/image7.jpg',
  '/categories/carousal/images/image8.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // slides every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[98%] h-[250px] overflow-hidden rounded-lg shadow-md mx-auto">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 95vw"
              priority={idx === 0} // preload first image
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`transition-all duration-300 focus:outline-none ${
              idx === currentIndex
                ? 'w-6 h-2 bg-gray-800 rounded-full'
                : 'w-2 h-2 bg-gray-400 rounded-full'
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
