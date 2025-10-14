// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
// import { fetchProducts } from "@/lib/store/products/product-slice";
// import { addToCart } from "@/lib/store/cart/cart-slice"; // 👈 import cart action
// import { Status } from "@/lib/global-type/type";
// import Link from "next/link";
// import { IProductData } from "@/lib/store/products/product-slice-type";
// import Carousel from "../components/products/carousal/carsoul";
// import { useRouter } from "next/navigation";
// import AddToCartButton from "../components/common/add-to-cart-buutton";
// import ProductsIntro from "../components/products/products-heading/products-heading";
// import ProductsCallToAction from "../components/products/products-call-to-acrion/products-call-to-action";

// export default function Products() {
//   const dispatch = useAppDispatch();
//   const productState = useAppSelector((state) => state.product);
//   const products = productState.product;
//   const status = productState.status;
//   const router = useRouter();

//   //user presence in the page
//   // const user = useAppSelector((state) => state.auth.user);
//   //toast message
//   const [errorToast, setErrorToast] = useState(false);

//   //succes add to cart pop-up
//   // const [showToast, setShowToast] = React.useState(false);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // const handleAddToCart = async (product: IProductData, quantity: number) => {
//   //   if (!user) {
//   //     // User not logged in
//   //     setErrorToast(true);
//   //     setTimeout(() => setErrorToast(false), 2000);
//   //     return;
//   //   }

//   //   try {
//   //     await dispatch(addToCart(product.id, quantity));

//   //     setShowToast(true);
//   //     setTimeout(() => setShowToast(false), 2000);
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };

//   if (status === Status.LOADING) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl font-semibold">Loading products...</p>
//       </div>
//     );
//   }

//   if (status === Status.ERROR) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl font-semibold text-red-600">
//           Failed to load products.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className=" min-h-screen pb-16">
//       <Carousel />
//       {/* User trying to add to cart without being logged in */}
//       {errorToast && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-red-600 text-white px-6 py-3 rounded shadow-lg">
//             Please log in to add items to your cart.
//           </div>
//         </div>
//       )}

//       {/* Container */}
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
//         <ProductsIntro/>
//         <section
//           id="Products"
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
//             >
//               {product.productDiscount > 0 && (
//                 <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
//                   -{product.productDiscount}%
//                 </div>
//               )}

//               <Link href={`/product-detail/${product.id}`} passHref>
//                 <img
//                   src={
//                     product.productImage || "https://via.placeholder.com/150"
//                   }
//                   alt={product.productName}
//                   className="h-24 w-full object-cover rounded-t-lg"
//                 />
//                 <div className="px-2 py-2">
//                   <p className="text-xs font-bold text-black capitalize mb-1">
//                     {product.productName}
//                   </p>
//                   <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
//                     {product.productDescription || "No description"}
//                   </p>

//                   <div className="flex items-center mt-2">
//                     <p className="text-xs font-semibold text-black">
//                       Rs. {product.productPrice}
//                     </p>
//                     {product.oldPrice && (
//                       <del className="ml-1 text-[10px] text-gray-600">
//                         Rs. {product.oldPrice}
//                       </del>
//                     )}

//                     {/* Cart Button */}
//                     {/* <button
//                       // onClick={(e) => {
//                       //   e.preventDefault();
//                       //   handleAddToCart(product, 1);
//                       // }}
//                       className="ml-auto text-indigo-600 hover:text-indigo-800"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={16}
//                         height={16}
//                         fill="currentColor"
//                         className="bi bi-cart-plus"
//                         viewBox="0 0 16 16"
//                       >
//                         <path
//                           d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 
//                0 0 1 0 1H8.5V12a.5.5 0 0 
//                1-1 0v-1.5H6a.5.5 0 0 1 
//                0-1h1.5V8a.5.5 0 0 1 
//                .5-.5z"
//                         />
//                         <path
//                           d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 
//                0 0 1 .485.379L2.89 3H14.5a.5.5 
//                0 0 1 .49.598l-1.5 7A.5.5 
//                0 0 1 13 11H4a.5.5 0 0 
//                1-.491-.408L2.01 3.607 
//                1.61 2H.5a.5.5 0 0 
//                1-.5-.5zM3.14 4l1.25 6h8.223l1.2-6H3.14zM5 
//                12a2 2 0 1 0 0 4 2 2 0 0 
//                0 0-4zm7 0a2 2 0 1 0 0 4 2 2 
//                0 0 0 0-4zm-7 1a1 1 0 1 1 0 
//                2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 
//                0 2 1 1 0 0 1 0-2z"
//                         />
//                       </svg>
//                     </button> */}
//                     <AddToCartButton product={product} />
//                   </div>

//                   <div className="mt-1">
//                     {product.productTotalStock > 10 ? (
//                       <p className="text-[10px] text-green-600 font-medium">
//                         In Stock
//                       </p>
//                     ) : product.productTotalStock > 0 ? (
//                       <p className="text-[10px] text-yellow-600 font-medium">
//                         Only {product.productTotalStock} left!
//                       </p>
//                     ) : (
//                       <p className="text-[10px] text-red-600 font-medium">
//                         Out of Stock
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </section>
//         <ProductsCallToAction/>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchProducts } from "@/lib/store/products/product-slice";
import { Status } from "@/lib/global-type/type";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AddToCartButton from "../components/common/add-to-cart-buutton";
import Carousel from "../components/products/carousal/carsoul";
import ProductsIntro from "../components/products/products-heading/products-heading";
import ProductsCallToAction from "../components/products/products-call-to-acrion/products-call-to-action";

export default function Products() {
  const dispatch = useAppDispatch();
  const { product: products, status } = useAppSelector((state) => state.product);
  const [errorToast, setErrorToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 60; // 10 rows * 6 items
  //for global search
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const totalPages = Math.ceil(products.length / productsPerPage);
  // const paginatedProducts = products.slice(
  //   (currentPage - 1) * productsPerPage,
  //   currentPage * productsPerPage
  // );

  //global search with pagination
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery)
      )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">
          Failed to load products.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Carousel />
      {errorToast && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded shadow-lg">
            Please log in to add items to your cart.
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
        <ProductsIntro />
        {/* Search heading */}
        {searchQuery && (
            <p className="text-sm text-gray-600 mb-4">
              Showing results for: <span className="font-medium">{searchQuery}</span>
            </p>
          )}

        {/* Product Grid */}
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {paginatedProducts.map((product) => (
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
                  src={product.productImage || "https://via.placeholder.com/150"}
                  alt={product.productName}
                  className="h-24 w-full object-cover rounded-t-lg"
                />
                <div className="px-2 py-2">
                  <p className="text-xs font-bold text-black capitalize mb-1">
                    {product.productName}
                  </p>
                  <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
                    {product.productDescription || "No description"}
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
                    <AddToCartButton product={product} />
                  </div>

                  <div className="mt-1">
                    {product.productTotalStock > 10 ? (
                      <p className="text-[10px] text-green-600 font-medium">
                        In Stock
                      </p>
                    ) : product.productTotalStock > 0 ? (
                      <p className="text-[10px] text-yellow-600 font-medium">
                        Only {product.productTotalStock} left!
                      </p>
                    ) : (
                      <p className="text-[10px] text-red-600 font-medium">
                        Out of Stock
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-40"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-40"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <ProductsCallToAction />
      </div>
    </div>
  );
}
