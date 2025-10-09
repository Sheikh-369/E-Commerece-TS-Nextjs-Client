"use client";
import React, { useState } from "react";
import { addToCart } from "@/lib/store/cart/cart-slice";
import { IProductData } from "@/lib/store/products/product-slice-type";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";

interface Props {
  product: IProductData;
  quantity?: number;
}

export default function AddToCartButton({ product, quantity = 1 }: Props) {
  const dispatch = useAppDispatch();
  const { checkAuth } = useAuthGuard();

  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const isAuthenticated = checkAuth(() => {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 2000);
    });

    if (!isAuthenticated) return;

    try {
      await dispatch(addToCart(product.id, quantity));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
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
          <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.14 4l1.25 6h8.223l1.2-6H3.14zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      </button>

      {/* Toasts */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          Item added to cart!
        </div>
      )}
      {errorToast && (
        <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
          Please log in to add items to your cart.
        </div>
      )}
    </>
  );
}
