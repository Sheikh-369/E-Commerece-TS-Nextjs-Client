// "use client";
// import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
// import { fetchCartItems } from "@/lib/store/cart/cart-slice";
// import { ICartItem } from "@/lib/store/cart/cart-slice-type";
// import React, { useEffect } from "react";

// function Cart() {
//   const dispatch = useAppDispatch();
//   const { items } = useAppSelector((store) => store.cart);
//   useEffect(() => {
//     dispatch(fetchCartItems());
//   }, [dispatch]);

//   //in case there is no items in the cart
//   if (items.length === 0) return <p>Your cart is empty.</p>;

//   //final calculation
//   const subtotal = items.reduce(
//     (sum, item) => sum + Number(item.product.productPrice) * item.quantity,
//     0
//   );

//   const taxes = subtotal * 0.1; // 10% tax
//   const shipping = subtotal > 1000 ? 0 : 50; // free shipping if subtotal > 1000
//   const total = subtotal + taxes + shipping;

//   return (
//     <>
//       <div className="bg-gray-100 min-h-screen py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl font-semibold mb-6 text-[#001f3f]">
//             Shopping Cart
//           </h1>
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Cart Items */}
//             <div className="md:w-3/4 flex flex-col gap-4">
//               {items.map((i: ICartItem) => (
//                 <div
//                   key={i.id}
//                   className={`bg-[#001f3f] rounded-lg shadow-md p-4 flex items-start justify-between text-white ${
//                     i.deletedAt ? "opacity-50 blur-sm" : ""
//                   }`}
//                 >
//                   {/* Product Info */}
//                   <div className="flex items-start gap-4 flex-1">
//                     <img
//                       src={
//                         i.product?.productImage ||
//                         "https://via.placeholder.com/150"
//                       }
//                       alt={i.product?.productName || "Deleted Product"}
//                       className="h-20 w-20 rounded-md object-cover"
//                     />
//                     <div className="flex flex-col gap-1">
//                       <h3 className="font-semibold text-white">
//                         {i.product?.productName || "Deleted Product"}
//                       </h3>
//                       <p className="text-sm text-gray-200">
//                         {i.product?.productDescription ||
//                           "No description available."}
//                       </p>
//                       <p className="text-sm font-medium mt-1">
//                         Rs. {i.product?.productPrice || "0.00"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Right side: Quantity + Total */}
//                   <div className="flex flex-col justify-start items-end gap-2">
//                     {/* Quantity Selector */}
//                     <div className="flex items-center bg-gray-200 text-black rounded-full px-2 py-1">
//                       <button className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
//                         -
//                       </button>
//                       <span className="px-3 text-sm">{i.quantity}</span>
//                       <button className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
//                         +
//                       </button>
//                     </div>

//                     {/* Total Price */}
//                     <div className="font-semibold">
//                       Rs.{" "}
//                       {(
//                         Number(i.product?.productPrice || 0) * i.quantity
//                       ).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Box */}
//             <div className="md:w-1/4">
//               <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
//                 <h2 className="text-lg font-semibold text-[#001f3f]">
//                   Summary
//                 </h2>
//                 <div className="flex justify-between text-sm">
//                   <span>Subtotal</span>
//                   <span>Rs. {subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Taxes</span>
//                   <span>Rs. {taxes.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Shipping</span>
//                   <span>Rs. {shipping.toFixed(2)}</span>
//                 </div>
//                 <hr className="my-2" />
//                 <div className="flex justify-between font-semibold text-[#001f3f]">
//                   <span>Total</span>
//                   <span>Rs. {total.toFixed(2)}</span>
//                 </div>
//                 <button className="bg-[#001f3f] text-white py-2 px-4 rounded-lg mt-3 w-full hover:bg-[#003366] transition">
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;



"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { fetchCartItems } from "@/lib/store/cart/cart-slice";
import { ICartItem } from "@/lib/store/cart/cart-slice-type";
import React, { useEffect } from "react";

function Cart() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // in case there are no items in the cart
  if (items.length === 0) return <p>Your cart is empty.</p>;

  // safe subtotal calculation: ignore null products
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.product?.productPrice || 0) * item.quantity),
    0
  );

  const taxes = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 1000 ? 0 : 50; // free shipping if subtotal > 1000
  const total = subtotal + taxes + shipping;

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-6 text-[#001f3f]">
            Shopping Cart
          </h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cart Items */}
            <div className="md:w-3/4 flex flex-col gap-4">
              {items.map((i: ICartItem) => (
                <div
                  key={i.id}
                  className={`bg-[#001f3f] rounded-lg shadow-md p-4 flex items-start justify-between text-white ${
  i.deletedAt ? "opacity-90 blur-[1px]" : ""
}`}
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={
                        (i.product?.productImage as string) ||
                        "https://via.placeholder.com/150"
                      }
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
                  <div className="flex flex-col justify-start items-end gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-200 text-black rounded-full px-2 py-1">
                      <button className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
                        -
                      </button>
                      <span className="px-3 text-sm">{i.quantity}</span>
                      <button className="text-sm px-2 py-1 rounded-full hover:bg-gray-300">
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
                <h2 className="text-lg font-semibold text-[#001f3f]">
                  Summary
                </h2>
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
                <button className="bg-[#001f3f] text-white py-2 px-4 rounded-lg mt-3 w-full hover:bg-[#003366] transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

