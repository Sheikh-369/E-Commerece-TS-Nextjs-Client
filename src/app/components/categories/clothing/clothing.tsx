"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { IProductData } from "@/lib/store/products/product-slice-type";
import { Status } from "@/lib/global-type/type";
import { fetchProductsByCategory } from "@/lib/store/products/product-slice";
import Link from "next/link";
import AddToCartButton from "../../common/add-to-cart-buutton";

function Clothing() {
  const dispatch = useAppDispatch();

  // Fallback to [] if undefined
  const products = useAppSelector(
    (state) => state.product.categoryProducts?.["clothing"] ?? []
  );
  const status = useAppSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(fetchProductsByCategory("clothing"));
  }, [dispatch]);

  const handleAddToCart = (product: IProductData, qty: number) => {
    console.log("Add to cart:", product.productName, qty);
  };

  return (
    <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-left">Clothing</h1>
        <Link href="/categories/clothing">
          <button className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-md shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
            <span>View All Clothings</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Failed to load products.</p>}

      {Array.isArray(products) && products.length > 0 && (
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ maxHeight: "calc(2 * (12rem + 1rem))", overflow: "hidden" }}
        >
          {products.slice(0, 8).map((product: IProductData) => (
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
                  src={
                    product.productImage || "https://via.placeholder.com/150"
                  }
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

                    <AddToCartButton product={product}/>
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
              </a>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Clothing;
