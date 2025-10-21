'use client'

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { cancelOrder, myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
import { Status } from "@/lib/global-type/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formatOrderStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Order Pending";
    case "preparing":
      return "Preparing Your Order";
    case "ontheway":
      return "Order On The Way";
    case "delivered":
      return "Order Delivered";
    case "cancelled":
      return "Order Cancelled";
    default:
      return "Order Status Unknown";
  }
};

const statusColor = {
  pending: "text-yellow-600",
  preparing: "text-blue-600",
  ontheway: "text-indigo-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
};

const MyOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.myOrders);
  const router = useRouter();

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

  const handleCancelOrder = async (orderId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    const result = await dispatch(cancelOrder(orderId));

    if (result?.success) {
      toast.success(result.message || "Order cancelled successfully");
    } else {
      toast.error(result.message || "Failed to cancel order");
    }
  };

  return (
    <div className="bg-sky-100 max-w-6xl mx-auto px-4 py-10 space-y-10">
      {orders.map((order, orderIndex) => {
        const colorKey = order.orderStatus.toLowerCase() as keyof typeof statusColor;
        const colorClass = statusColor[colorKey] || "text-gray-700";

        return (
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
                <h2 className={`text-base font-semibold ${colorClass}`}>
                  {formatOrderStatus(order.orderStatus)}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-3 md:mt-0 text-right space-y-1">
                <span
                  className={`inline-block text-xs font-medium px-4 py-1 rounded-full shadow-sm ${
                    order.payment.paymentStatus.toLowerCase() === "paid"
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
                      <p className="text-sm text-gray-500">Qty: {detail.orderQuantity}</p>
                      <p className="text-sm font-semibold text-indigo-600">
                        Rs. {product.productPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-between items-center">
              {(order.orderStatus === "pending" || order.orderStatus === "preparing") && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="text-sm text-red-600 hover:text-red-800 hover:underline font-medium transition"
                >
                  Cancel Order
                </button>
              )}

              <button
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition"
                onClick={() => router.push(`/user/dashboard/my-orders/${order.id}`)}
              >
                View Order Details →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
