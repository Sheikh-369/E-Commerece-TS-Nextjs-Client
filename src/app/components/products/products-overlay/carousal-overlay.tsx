// components/products/carousel-overlay.tsx
'use client'

import React from 'react'

export default function CarouselOverlay() {
  return (
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 text-white text-center">
      <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold px-4">
        Welcome to Our Store — Style, Deals & Quality in One Place
      </h1>
    </div>
  )
}
