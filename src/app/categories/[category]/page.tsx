"use client";

import React, { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchProductsByCategory } from "@/lib/store/products/product-slice";
import { IProductData } from "@/lib/store/products/product-slice-type";
import { Status } from "@/lib/global-type/type";
import AddToCartButton from "@/app/components/common/add-to-cart-buutton";

const CATEGORY_NAMES: Record<string, string> = {
  drinks: "Drinks",
  electronics: "Electronics",
  clothing: "Clothing",
  groceries: "Groceries",
  // Add more categories here as needed
};

function CategoryPage() {
  const params = useParams();
  const categoryParam = params?.category;

  // ✅ Safely extract categoryKey as string
  const categoryKey =
    typeof categoryParam === "string"
      ? categoryParam
      : Array.isArray(categoryParam) && categoryParam.length > 0
      ? categoryParam[0]
      : undefined;

  // 🚫 Redirect to 404 if invalid
  if (!categoryKey) {
    notFound();
  }

  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (state) => state.product.categoryProducts[categoryKey] ?? []
  );
  const status = useAppSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryKey));
  }, [dispatch, categoryKey]);

  const handleAddToCart = (product: IProductData, qty: number) => {
    console.log("Add to cart:", product.productName, qty);
  };

  return (
    <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold capitalize text-left">
          {CATEGORY_NAMES[categoryKey] || categoryKey}
        </h1>
        <Link href="/categories">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 underline">
            ← Back to Categories
          </button>
        </Link>
      </div>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Failed to load products.</p>}

      {Array.isArray(products) && products.length > 0 ? (
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {products.map((product: IProductData) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
            >
              {product.productDiscount > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
                  -{product.productDiscount}%
                </div>
              )}

              <Link href={`/product-detail/${product.id}`}>
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
              </Link>
            </div>
          ))}
        </section>
      ) : (
        status !== Status.LOADING && (
          <p className="mt-8 text-center text-sm text-gray-600">
            No products found in this category.
          </p>
        )
      )}
    </div>
  );
}

export default CategoryPage;
