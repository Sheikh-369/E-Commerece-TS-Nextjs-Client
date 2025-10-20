'use client';

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { Status } from "@/lib/global-type/type";
import { fetchOrderById } from "@/lib/store/user/my-orders/my-orders-slice";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedOrder: order, status } = useAppSelector((state) => state.myOrders);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchOrderById(id));
    }
  }, [id, dispatch]);

  if (status === Status.LOADING) return <div className="text-center py-20 text-gray-500">Loading order details...</div>;
  if (!order) return <div className="text-center py-20 text-red-500">Order not found.</div>;

  return (
    <div className="bg-sky-100 max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Order Summary */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Thank you for your order!</h1>
        <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        
        <div className="flex items-center gap-2">
          {order.payment.paymentStatus === "Paid" ? (
            <span className="inline-flex items-center text-green-600 text-sm font-medium">
              <FaCheckCircle className="mr-1" />
              Payment Successful
            </span>
          ) : (
            <span className="inline-flex items-center text-yellow-600 text-sm font-medium">
              <FaClock className="mr-1" />
              Payment Pending
            </span>
          )}
        </div>

        <p className="text-md text-gray-800 font-semibold mt-2">
          Total: <span className="text-indigo-600 font-bold">Rs. {order.totalAmount.toFixed(2)}</span>
        </p>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Items in your order</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {order.orderDetails.map((detail, idx) => {
            const product = detail.product;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-gray-800 text-base">{product.productName}</h3>
                  <p className="text-sm text-gray-500">Qty: {detail.orderQuantity}</p>
                  <p className="text-sm font-semibold text-indigo-600">Rs. {product.productPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
