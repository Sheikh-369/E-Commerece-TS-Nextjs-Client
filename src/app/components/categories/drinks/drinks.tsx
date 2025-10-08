// 'use client'
// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/lib/store/auth/hooks';
// import { IProductData } from '@/lib/store/products/product-slice-type';
// import { Status } from '@/lib/global-type/type';
// import { fetchProductsByCategory } from '@/lib/store/products/product-slice';
// // import { fetchDrinks } from '@/lib/store/products/product-slice';

// function Drinks() {
//   const dispatch = useAppDispatch();
//   // const products = useAppSelector((store) => store.product.drinks); // get product array
//   const categoryProducts=useAppSelector(state=>state.product.categoryProducts["drinks"])
//   const status = useAppSelector((store) => store.product.status); // get status

//   useEffect(() => {
//     dispatch(fetchProductsByCategory("drinks"));
//   }, [dispatch]);

//   const handleAddToCart = (product: IProductData, qty: number) => {
//     console.log('Add to cart:', product.productName, qty);
//   };

//   return (
//     <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-semibold text-left">Drinks</h1>
//       </div>

//       {status === Status.LOADING && <p>Loading...</p>}
//       {status === Status.ERROR && <p>Failed to load products.</p>}

//       {categoryProducts.length > 0 && (
//         <section
//           id="Products"
//           className="grid grid-cols-2 sm:grid-cols-4 gap-4"
//           style={{ maxHeight: 'calc(2 * (12rem + 1rem))', overflow: 'hidden' }}
//         >
//           {categoryProducts.slice(0, 8).map((product: IProductData) => (
//             <div
//               key={product.id}
//               className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
//             >
//               {product.productDiscount > 0 && (
//                 <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
//                   -{product.productDiscount}%
//                 </div>
//               )}

//               <a href={`/product-detail/${product.id}`}>
//                 <img
//                   src={product.productImage || 'https://via.placeholder.com/150'}
//                   alt={product.productName}
//                   className="h-24 w-full object-cover rounded-t-lg"
//                 />
//                 <div className="px-2 py-2">
//                   <p className="text-xs font-bold text-black capitalize mb-1">
//                     {product.productName}
//                   </p>
//                   <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
//                     {product.productDescription || 'No description'}
//                   </p>

//                   <div className="flex items-center mt-2">
//                     <p className="text-xs font-semibold text-black">Rs. {product.productPrice}</p>
//                     {product.oldPrice && (
//                       <del className="ml-1 text-[10px] text-gray-600">Rs. {product.oldPrice}</del>
//                     )}

//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleAddToCart(product, 1);
//                       }}
//                       className="ml-auto text-indigo-600 hover:text-indigo-800"
//                       aria-label={`Add ${product.productName} to cart`}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={16}
//                         height={16}
//                         fill="currentColor"
//                         className="bi bi-cart-plus"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
//                         <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.14 4l1.25 6h8.223l1.2-6H3.14zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="mt-1">
//                     {product.productTotalStock > 10 ? (
//                       <p className="text-[10px] text-green-600 font-medium">In Stock</p>
//                     ) : product.productTotalStock > 0 ? (
//                       <p className="text-[10px] text-yellow-600 font-medium">
//                         Only {product.productTotalStock} left!
//                       </p>
//                     ) : (
//                       <p className="text-[10px] text-red-600 font-medium">Out of Stock</p>
//                     )}
//                   </div>
//                 </div>
//               </a>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// }

// export default Drinks;


'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/auth/hooks';
import { IProductData } from '@/lib/store/products/product-slice-type';
import { Status } from '@/lib/global-type/type';
import { fetchProductsByCategory } from '@/lib/store/products/product-slice';

function Drinks() {
  const dispatch = useAppDispatch();

  // Fallback to empty array if undefined
  const categoryProducts = useAppSelector((state) => state.product.categoryProducts['drinks'] ?? []
  );
  const status = useAppSelector((store) => store.product.status);

  useEffect(() => {
    dispatch(fetchProductsByCategory('drinks'));
  }, [dispatch]);

  const handleAddToCart = (product: IProductData, qty: number) => {
    console.log('Add to cart:', product.productName, qty);
  };

  return (
    <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-left">Drinks</h1>
      </div>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Failed to load products.</p>}

      {Array.isArray(categoryProducts) && categoryProducts.length > 0 && (
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ maxHeight: 'calc(2 * (12rem + 1rem))', overflow: 'hidden' }}
        >
          {categoryProducts.slice(0, 8).map((product: IProductData) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
            >
              {product.productDiscount > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
                  -{product.productDiscount}%
                </div>
              )}

              <a href={`/product-detail/${product.id}`}>
                <img
                  src={product.productImage || 'https://via.placeholder.com/150'}
                  alt={product.productName}
                  className="h-24 w-full object-cover rounded-t-lg"
                />
                <div className="px-2 py-2">
                  <p className="text-xs font-bold text-black capitalize mb-1">
                    {product.productName}
                  </p>
                  <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
                    {product.productDescription || 'No description'}
                  </p>

                  <div className="flex items-center mt-2">
                    <p className="text-xs font-semibold text-black">
                      Rs. {product.productPrice}
                    </p>
                    {product.oldPrice && (
                      <del className="ml-1 text-[10px] text-gray-600">
                        Rs. {product.oldPrice}
                      </del>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product, 1);
                      }}
                      className="ml-auto text-indigo-600 hover:text-indigo-800"
                      aria-label={`Add ${product.productName} to cart`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-cart-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.14 4l1.25 6h8.223l1.2-6H3.14zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
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
              </a>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Drinks;

