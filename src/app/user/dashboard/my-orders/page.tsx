'use client'

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
import { Status } from "@/lib/global-type/type";

const MyOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center py-10 text-gray-500 text-lg">
        Fetching your orders...
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="flex justify-center py-10 text-red-500 text-lg">
        Failed to load orders. Please try again.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center py-10 text-gray-400 text-lg">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {orders.map((order, orderIndex) => (
        <div
          key={order.id}
          className={`rounded-2xl border border-gray-200 p-6 md:p-8 shadow-md bg-gradient-to-br ${
            orderIndex % 2 === 0
              ? "from-[#f0f4ff] to-[#e0e7ff]"
              : "from-[#fdf9ff] to-[#f3e8ff]"
          }`}
        >
          {/* Header */}
          <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 pb-4">
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-indigo-700">
                Order Placed
              </h2>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-3 md:mt-0 text-right space-y-1">
              <span
                className={`inline-block text-xs font-medium px-4 py-1 rounded-full shadow-sm ${
                  order.payment.paymentStatus === "Paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.payment.paymentStatus}
              </span>
              <p className="text-md font-semibold text-gray-800">
                Total: Rs. {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {order.orderDetails.map((detail, index) => {
              const product = detail.product;
              if (!product) return null;

              return (
                <div
                  key={index}
                  className="bg-white/80 rounded-xl overflow-hidden flex items-center space-x-4 shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded-l-lg"
                    loading="lazy"
                  />
                  <div className="py-2 pr-3">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {detail.orderQuantity}
                    </p>
                    <p className="text-sm font-semibold text-indigo-600">
                      Rs. {product.productPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-end">
            <button
              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition"
              onClick={() => console.log("View Order Details")}
            >
              View Order Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
