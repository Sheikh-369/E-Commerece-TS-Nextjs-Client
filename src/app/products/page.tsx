// 'use client'
// import React, { useEffect, useState, useRef } from 'react'
// import { useAppDispatch, useAppSelector } from '@/lib/store/auth/hooks'
// import { fetchProducts } from '@/lib/store/products/product-slice'
// import { Status } from '@/lib/global-type/type'
// import Link from 'next/link'

// const carouselImages = [
//   {
//     url: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     alt: 'Cart with cartoons.',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1594966392038-1a34ee7f0a4b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     alt: 'Multiple pairs of cosmetics lined up on shelves',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
//     alt: 'Variety of beauty products and cosmetics',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
//     alt: 'Assortment of watches and jewelry',
//   }
// ];


// function Carousel() {
//   const [current, setCurrent] = useState(0)
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null)
//   const delay = 3500

//   const resetTimeout = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current)
//     }
//   }

//   useEffect(() => {
//     resetTimeout()
//     timeoutRef.current = setTimeout(() => {
//       setCurrent((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
//     }, delay)

//     return () => {
//       resetTimeout()
//     }
//   }, [current])

//   return (
//     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//       <div className="overflow-hidden rounded-3xl shadow-lg relative">
//         <div
//           className="flex transition-transform ease-in-out duration-700"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {carouselImages.map(({ url, alt }, index) => (
//             <img
//               key={index}
//               src={url}
//               alt={alt}
//               className="w-full flex-shrink-0 object-cover h-80 sm:h-96 md:h-[28rem] rounded-3xl"
//             />
//           ))}
//         </div>

//         {/* Dots */}
//         <div className="absolute bottom-4 right-8 flex space-x-3 z-20">
//           {carouselImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`transition-all duration-300 ${
//                 current === index
//                   ? 'bg-indigo-600 rounded-lg w-10 h-3'
//                   : 'bg-indigo-300 rounded-full w-3 h-3 md:w-4 md:h-4'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Products() {
//   const dispatch = useAppDispatch()

//   const productState = useAppSelector((state) => state.product)
//   const products = productState.product
//   const status = productState.status

//   useEffect(() => {
//     dispatch(fetchProducts())
//   }, [dispatch])

//   if (status === Status.LOADING) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl font-semibold">Loading products...</p>
//       </div>
//     )
//   }

//   if (status === Status.ERROR) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl font-semibold text-red-600">Failed to load products.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-sky-50 min-h-screen pb-16">
//       <Carousel />

//       {/* Container */}
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
//         <section
//           id="Products"
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="relative bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
//             >
//               {product.productDiscount > 0 && (
//                 <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
//                   -{product.productDiscount}%
//                 </div>
//               )}

//               <Link href={`/product-detail/${product.id}`} passHref>
//                 <img
//                   src={product.productImage || 'https://via.placeholder.com/300'}
//                   alt={product.productName}
//                   className="h-48 w-full object-cover rounded-t-xl"
//                 />
//                 <div className="px-3 py-3">
//                   <p className="text-sm font-bold text-black capitalize mb-1">{product.productName}</p>
//                   <p className="text-xs text-gray-600 line-clamp-2 h-[32px]">
//                     {product.productDescription || 'No description'}
//                   </p>

//                   <div className="flex items-center mt-3">
//                     <p className="text-sm font-semibold text-black">${product.productPrice}</p>
//                     {product.oldPrice && (
//                       <del className="ml-2 text-xs text-gray-600">${product.oldPrice}</del>
//                     )}
//                     <div className="ml-auto">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={18}
//                         height={18}
//                         fill="currentColor"
//                         className="bi bi-bag-plus"
//                         viewBox="0 0 16 16"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
//                         />
//                         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div className="mt-2">
//                     {product.productTotalStock > 10 ? (
//                       <p className="text-xs text-green-600 font-medium">In Stock</p>
//                     ) : product.productTotalStock > 0 ? (
//                       <p className="text-xs text-yellow-600 font-medium">
//                         Only {product.productTotalStock} left!
//                       </p>
//                     ) : (
//                       <p className="text-xs text-red-600 font-medium">Out of Stock</p>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   )
// }



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

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product.id))
  }

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
  <p className="text-xs font-semibold text-black">${product.productPrice}</p>
  {product.oldPrice && (
    <del className="ml-1 text-[10px] text-gray-600">${product.oldPrice}</del>
  )}

  {/* Cart Button */}
  <button
    onClick={(e) => {
      e.preventDefault()
      handleAddToCart(product)
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
