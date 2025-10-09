"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { Status } from "@/lib/global-type/type";
import { fetchProductById } from "@/lib/store/products/product-slice";
import { addToCart } from "@/lib/store/cart/cart-slice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Quantity control logic
  const [quantity, setQuantity] = React.useState(1);

  const productSlice = useAppSelector((state) => state.product);
  const { selectedProduct: product, status } = productSlice;

  // Debug log
  console.log("ProductDetail: id", id);
  console.log("Product slice state", productSlice);

  // Add to cart logic
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product.id, quantity));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id as string));
    }
  }, [dispatch, id]);

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">
          Failed to load product.
        </p>
      </div>
    );
  }

  // If status is SUCCESS but product is still null or undefined
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">No product data found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="flex w-[1200px] h-[530px] p-10 bg-white border-gray-400 rounded-xl border-2">
        {/* Product Image */}
        <img
          className="w-[556px] ml-3 mr-6 rounded-xl object-contain"
          src={product.productImage || "https://via.placeholder.com/500"}
          alt={product.productName}
        />

        <div>
          {/* Product Name and Stock */}
          <div className="flex gap-2 items-center">
            <h1 className="text-[36px] leading-[44px] font-semibold text-black">
              {product.productName}
            </h1>
            <span className="text-sm text-[#2C742F] px-2 py-1 bg-[#20B526] bg-opacity-20">
              {product.productTotalStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Price & Discount */}
          <div className="h-9 mt-5 justify-start items-center gap-3 inline-flex">
            <div className="justify-start items-center gap-1 flex">
              {product.oldPrice && (
                <div className="text-[#b3b3b3] text-xl font-normal line-through leading-[30px]">
                  ${product.oldPrice}
                </div>
              )}
              <div className="text-[#2c732f] text-2xl font-medium leading-9">
                ${product.productPrice}
              </div>
            </div>
            {product.productDiscount > 0 && (
              <div className="px-2.5 py-[3px] bg-[#e94b48]/10 rounded-[30px] text-[#e94b48] text-sm font-medium leading-[21px]">
                {product.productDiscount}% Off
              </div>
            )}
          </div>

          {/* Description */}
          <p className="w-[500px] text-justify text-[#7f7f7f] text-sm font-normal mt-4 leading-[21px]">
            {product.productDescription || "No description available."}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="h-[88px] mt-6 py-[18px] bg-white border border-white justify-center items-center gap-3 flex">
            <div className="p-2 bg-white rounded-[170px] border border-neutral-200 justify-center items-center flex">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-[34px] h-[34px]"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-10 text-center text-[#191919] text-base font-normal leading-normal"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-[34px] h-[34px]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="h-[51px] px-20 py-4 bg-[#00b206] rounded-[43px] justify-center items-center gap-4 flex"
            >
              <span className="text-white text-base font-semibold leading-tight">
                Add to Cart
              </span>
            </button>
          </div>

          {/* Category */}
          <div className="h-[54px] mt-6 flex-col justify-start items-start gap-3 inline-flex">
            <div className="justify-start items-start gap-1.5 inline-flex">
              <span className="text-[#191919] text-sm font-medium leading-[21px]">
                Category:
              </span>
              <span className="text-[#7f7f7f] text-sm font-normal leading-[21px]">
                {product.category?.categoryName || "Uncategorized"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
