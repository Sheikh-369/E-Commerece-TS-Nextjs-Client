'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/auth/hooks'
import { fetchProducts } from '@/lib/store/products/product-slice'
import { addToCart } from '@/lib/store/cart/cart-slice' // 👈 import cart action
import { Status } from '@/lib/global-type/type'
import Link from 'next/link'

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1032&auto=format&fit=crop',
    alt: 'Cart with cartoons.',
  },
  {
    url: 'https://images.unsplash.com/photo-1594966392038-1a34ee7f0a4b?q=80&w=870&auto=format&fit=crop',
    alt: 'Multiple pairs of cosmetics lined up on shelves',
  },
  {
    url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    alt: 'Variety of beauty products and cosmetics',
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    alt: 'Assortment of watches and jewelry',
  }
];

function Carousel() {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const delay = 3500

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    }, delay)

    return () => resetTimeout()
  }, [current])

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="overflow-hidden rounded-3xl shadow-lg relative">
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
                  ? 'bg-indigo-600 rounded-lg w-8 h-2'
                  : 'bg-indigo-300 rounded-full w-2.5 h-2.5 md:w-3 md:h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const dispatch = useAppDispatch()

  const productState = useAppSelector((state) => state.product)
  const products = productState.product
  const status = productState.status

  //succes add to cart pop-up
  const [showToast, setShowToast] = React.useState(false);



  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

 const handleAddToCart = async (product: any, quantity: number) => {
  try {
    await dispatch(addToCart(product.id, quantity));

    // Show toast
    setShowToast(true);

    // Hide after 2 seconds
    setTimeout(() => setShowToast(false), 2000);
  } catch (err) {
    console.log(err);
  }
};



  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    )
  }

  if (status === Status.ERROR) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">Failed to load products.</p>
      </div>
    )
  }

  return (
    <div className="bg-sky-50 min-h-screen pb-16">
      <Carousel />
      {/* Item added to cart pop-up */}
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded shadow-lg">
            Item added to cart!
          </div>
        </div>
      )}

      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
            >
              {product.productDiscount > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
                  -{product.productDiscount}%
                </div>
              )}

              <Link href={`/product-detail/${product.id}`} passHref>
                <img
                  src={product.productImage || 'https://via.placeholder.com/150'}
                  alt={product.productName}
                  className="h-24 w-full object-cover rounded-t-lg"
                />
                <div className="px-2 py-2">
                  <p className="text-xs font-bold text-black capitalize mb-1">{product.productName}</p>
                  <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
                    {product.productDescription || 'No description'}
                  </p>

                  <div className="flex items-center mt-2">
  <p className="text-xs font-semibold text-black">Rs. {product.productPrice}</p>
  {product.oldPrice && (
    <del className="ml-1 text-[10px] text-gray-600">Rs. {product.oldPrice}</del>
  )}

  {/* Cart Button */}
  <button
    onClick={(e) => {
      e.preventDefault()
      handleAddToCart(product,1)
    }}
    className="ml-auto text-indigo-600 hover:text-indigo-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="bi bi-cart-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 
               0 0 1 0 1H8.5V12a.5.5 0 0 
               1-1 0v-1.5H6a.5.5 0 0 1 
               0-1h1.5V8a.5.5 0 0 1 
               .5-.5z" />
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 
               0 0 1 .485.379L2.89 3H14.5a.5.5 
               0 0 1 .49.598l-1.5 7A.5.5 
               0 0 1 13 11H4a.5.5 0 0 
               1-.491-.408L2.01 3.607 
               1.61 2H.5a.5.5 0 0 
               1-.5-.5zM3.14 4l1.25 6h8.223l1.2-6H3.14zM5 
               12a2 2 0 1 0 0 4 2 2 0 0 
               0 0-4zm7 0a2 2 0 1 0 0 4 2 2 
               0 0 0 0-4zm-7 1a1 1 0 1 1 0 
               2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 
               0 2 1 1 0 0 1 0-2z" />
    </svg>
  </button>
</div>


                  <div className="mt-1">
                    {product.productTotalStock > 10 ? (
                      <p className="text-[10px] text-green-600 font-medium">In Stock</p>
                    ) : product.productTotalStock > 0 ? (
                      <p className="text-[10px] text-yellow-600 font-medium">
                        Only {product.productTotalStock} left!
                      </p>
                    ) : (
                      <p className="text-[10px] text-red-600 font-medium">Out of Stock</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
