// components/products/products-call-to-action.tsx
'use client'

import Link from 'next/link'
import React from 'react'

export default function ProductsCallToAction() {
  return (
    <div className="mt-10 text-center">
      <p className="text-sm text-gray-600">
        Can't find what you're looking for? Browse our categories or use the search bar above!
      </p>
      <Link
        href="/categories"
        className="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
      >
        Shop by Category →
      </Link>
    </div>
  )
}
