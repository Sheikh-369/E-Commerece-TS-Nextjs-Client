"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchCartItems } from "@/lib/store/cart/cart-slice";
import { createAnOrder } from "@/lib/store/check-out/check-out-slice";
import {
  IOrderData,
  PaymentMethod,
} from "@/lib/store/check-out/check-out-slice-type";
import { ICartItem } from "@/lib/store/cart/cart-slice-type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function CheckOutContent() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const router = useRouter();
  //for khalti integration logic
  const{khaltiUrl}=useAppSelector((store)=>store.checkout)

  // ✅ Safe to use here
  const searchParams = useSearchParams();
  const selectedItemIds = searchParams.get("items")?.split(",") || [];

  const itemsToCalculate =
    selectedItemIds.length > 0
      ? items.filter((item) => selectedItemIds.includes(item.id!))
      : items;

  const subtotal = itemsToCalculate.reduce(
    (sum, item) =>
      sum + Number(item.product?.productPrice || 0) * item.quantity,
    0
  );

  const taxes = subtotal * 0.1;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + taxes + shipping;

  const [orderData, setOrderData] = useState<IOrderData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    province: "",
    district: "",
    city: "",
    tole: "",
    totalAmount: 0,
    paymentMethod: PaymentMethod.COD,
    products: [],
  });

  //payment selection for khalti
    const [paymentMethod,setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD)
    const handlePaymentMethod = (paymentData:PaymentMethod)=>{
      setPaymentMethod(paymentData)
      setOrderData({
        ...orderData, 
        paymentMethod : paymentData
      })
    }

  const handleOrderDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleOrderDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = itemsToCalculate
      .filter(
        (item): item is ICartItem & { productId: string } => !!item.productId
      )
      .map((item) => ({
        productId: item.productId,
        orderQuantity: item.quantity,
      }));

    const finalData: IOrderData = {
      ...orderData,
      products: productData,
      totalAmount: total,
    };

    await dispatch(createAnOrder(finalData));


  };

  useEffect(() => {
    dispatch(fetchCartItems());
    if(khaltiUrl){
        window.location.href = khaltiUrl
        return; 
      }
  }, [dispatch,khaltiUrl]);

  return (
    <div className="bg-white">
      <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Left: Cart Summary */}
        <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
          <div className="relative h-full">
            <div className="px-6 py-8 md:overflow-auto md:h-screen">
              <div className="space-y-4">
                {itemsToCalculate.length > 0 ? (
                  itemsToCalculate.map((i: ICartItem) => (
                    <div key={i.id} className="flex items-start gap-4">
                      <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                        <img
                          src={
                            (i.product?.productImage as string) ||
                            "https://via.placeholder.com/150"
                          }
                          alt={i.product?.productName || "Deleted Product"}
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-slate-900 font-semibold">
                          {i.product?.productName}
                        </h3>
                        <ul className="text-xs text-slate-900 space-y-2 mt-3">
                          <li className="flex flex-wrap gap-4">
                            Quantity{" "}
                            <span className="ml-auto">{i.quantity}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price{" "}
                            <span className="ml-auto font-semibold">
                              Rs.{" "}
                              {(
                                Number(i.product?.productPrice || 0) *
                                i.quantity
                              ).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items selected.</p>
                )}
              </div>

              <hr className="border-gray-300 my-8" />
              <div>
                <ul className="text-slate-500 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      Rs. {shipping.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      Rs. {taxes.toFixed(2)}
                    </span>
                  </li>
                  <hr className="border-slate-300" />
                  <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                    Total{" "}
                    <span className="ml-auto">Rs. {total.toFixed(2)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Delivery & Payment */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <form onSubmit={handleOrderDataSubmission}>
            <div>
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Delivery Details
              </h2>
              <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "phoneNumber",
                  "province",
                  "district",
                  "city",
                  "tole",
                ].map((field) => (
                  <div key={field}>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Enter ${field}`}
                      onChange={handleOrderDataChange}
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Payment
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* COD Option */}
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={PaymentMethod.COD}
                      checked={orderData.paymentMethod === PaymentMethod.COD}
                      onChange={(e)=>handlePaymentMethod(e.target.value as PaymentMethod)}
                      className="w-5 h-5 cursor-pointer"
                      id="cod"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-4 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Cash on Delivery
                      </span>
                      <Image
                        src="/check-out/COD.jpg"
                        alt="COD"
                        height={54}
                        width={54}
                        className="w-8 h-8"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with cash when your order is delivered.
                  </p>
                </div>

                {/* Khalti Option */}
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={PaymentMethod.Khalti}
                      checked={orderData.paymentMethod === PaymentMethod.Khalti}
                      onChange={(e)=>handlePaymentMethod(e.target.value as PaymentMethod)}
                      className="w-5 h-5 cursor-pointer"
                      id="khalti"
                    />
                    <label
                      htmlFor="khalti"
                      className="ml-4 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Khalti
                      </span>
                      <Image
                        src="/check-out/Khalti.jpg"
                        alt="Khalti"
                        height={50}
                        width={50}
                        className="w-12 h-8 object-contain"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay securely using your Khalti wallet.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex item-center mt-8">
              {
                paymentMethod===PaymentMethod.COD && (
                  <button
                type="submit"
                className="rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Cash on delivery
              </button>
                )
              }
              {
                paymentMethod===PaymentMethod.Khalti && (
                  <button
                type="submit"
                className="rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Pay With Khalti
              </button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckOut() {
  return (
    <React.Suspense fallback={<p>Loading checkout...</p>}>
      <CheckOutContent />
    </React.Suspense>
  );
}
