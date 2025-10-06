"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import {
  deleteCartItems,
  deleteMultipleCartItems,
  fetchCartItems,
  updateCartItemQuantity,
} from "@/lib/store/cart/cart-slice";
import { ICartItem } from "@/lib/store/cart/cart-slice-type";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import DeleteCartItemModal from "./delete-cart-modal";
import Link from "next/link";

function Cart() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);

  // delete logic
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ICartItem | null>(null);
  // multiple deleting by selecting
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  //quantity updating
  const handleQuantityChange = (cartItemId: string, delta: number, currentQty: number) => {
    const newQty = currentQty + delta;      // +1 or -1
    if (newQty < 1) return;                 // minimum quantity check
    dispatch(updateCartItemQuantity(cartItemId, newQty));
  };


  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // in case there are no items in the cart
  if (items.length === 0) return <p>Your cart is empty.</p>;

  // calculate totals only for selected items if any, else all items
  const itemsToCalculate =
    selectedItems.length > 0
      ? items.filter((item) => selectedItems.includes(item.id!))
      : items;

  // safe subtotal calculation: ignore null products
  const subtotal = itemsToCalculate.reduce(
    (sum, item) =>
      sum + Number(item.product?.productPrice || 0) * item.quantity,
    0
  );

  const taxes = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 1000 ? 0 : 50; // free shipping if subtotal > 1000
  const total = subtotal + taxes + shipping;

  // delete multiple items
  const handleDeleteSelected = () => {
    dispatch(deleteMultipleCartItems(selectedItems));
    setSelectedItems([]); // reset after deletion
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* Delete Cart Item Modal */}
      <DeleteCartItemModal
        itemToDelete={itemToDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#001f3f]">
            Shopping Cart
          </h1>
          {/* Multi-delete button */}
          <button
            disabled={selectedItems.length === 0}
            onClick={handleDeleteSelected}
            className="text-red-700 px-4 py-2 rounded hover:bg-red-100 flex items-center gap-1 mr-65"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <div className="md:w-3/4 flex flex-col gap-4">
            {items.map((i: ICartItem) => (
              <div
                key={i.id}
                className={`relative bg-[#001f3f] rounded-lg shadow-md p-4 flex items-start justify-between text-white ${
                  i.deletedAt ? "opacity-90 blur-[1px]" : ""
                }`}
              >
                {/* Delete Icon */}
                <button
                  onClick={() => {
                    setItemToDelete(i);
                    setDeleteModalOpen(true);
                  }}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>

                {/* Checkbox for multiple selection */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(i.id!)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, i.id!]);
                    } else {
                      setSelectedItems(selectedItems.filter((id) => id !== i.id));
                    }
                  }}
                  className="absolute top-10 right-3"
                />

                {/* Product Info */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={(i.product?.productImage as string) || "https://via.placeholder.com/150"}
                    alt={i.product?.productName || "Deleted Product"}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-white">
                      {i.product?.productName || "Deleted Product"}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {i.product?.productDescription || "No description available."}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Rs. {i.product?.productPrice || "0"}
                    </p>
                  </div>
                </div>

                {/* Right side: Quantity + Total */}
                <div className="flex flex-col justify-start items-end gap-2 mr-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-gray-200 text-black rounded-full px-2 py-1">
                    <button onClick={() => handleQuantityChange(i.id!, -1, i.quantity)} className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
                      -
                    </button>
                    <span className="px-3 text-sm">{i.quantity}</span>
                    <button onClick={() => handleQuantityChange(i.id!, 1, i.quantity)} className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="font-semibold">
                    Rs. {(Number(i.product?.productPrice || 0) * i.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-[#001f3f]">Summary</h2>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes</span>
                <span>Rs. {taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-[#001f3f]">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <Link href={'/check-out'}>
                <button className="bg-[#001f3f] text-white py-2 px-4 rounded-lg mt-3 w-full hover:bg-[#003366] transition">
                Checkout
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
