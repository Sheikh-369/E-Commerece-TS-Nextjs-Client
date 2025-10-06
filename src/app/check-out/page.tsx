'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { fetchCartItems } from "@/lib/store/cart/cart-slice";
import { ICartItem } from "@/lib/store/cart/cart-slice-type";
import { createAnOrder } from "@/lib/store/check-out/check-out-slice";
import { IOrderData, IOrderProduct, PaymentMethod } from "@/lib/store/check-out/check-out-slice-type";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

function CheckOut() {
    const dispatch=useAppDispatch()
    const {items}=useAppSelector((store)=>store.cart)
    console.log("items",items)//checking the items

        //subtoal-calculation logic.
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

    const[orderData,setOrderData]=useState<IOrderData>({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",
        province:"",
        district:"",
        city:"",
        tole:"",
        totalAmount:0,
        paymentMethod:PaymentMethod.COD,
        products:[]
    })

    const handleOrderDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setOrderData({
            ...orderData,
            [name]:value
        })
    }

const handleOrderDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("🛒 Cart items:", items);

  const productData = items
    .filter((item): item is ICartItem & { productId: string } => !!item.productId)
    .map((item) => ({
      productId: item.productId,
      orderQuantity: item.quantity,
    }));

  if (productData.length < items.length) {
    console.warn("⚠️ Some cart items were skipped due to missing productId.");
  }

  const finalData: IOrderData = {
    ...orderData,
    products: productData,
    totalAmount: total,
  };

  console.log("📦 Final order data being submitted:", finalData);

  await dispatch(createAnOrder(finalData));
};





    useEffect(()=>{
        dispatch(fetchCartItems())
    },[dispatch])
  return (
    <>
      <div className="bg-white">
        <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
            <div className="relative h-full">
              <div className="px-6 py-8 md:overflow-auto md:h-screen">
                <div className="space-y-4">
                    {
                        items.length>0 ? items.map((i:ICartItem)=>(
                            <div key={i.id} className="flex items-start gap-4">
                    <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                      <img
                        src={(i.product?.productImage as string) || "https://via.placeholder.com/150"}
                        alt={i.product?.productName || "Deleted Product"}
                        className="w-full object-contain"
                      />
                    </div>
                        <div className="w-full">
                      <h3 className="text-sm text-slate-900 font-semibold">
                        {i.product.productName}
                      </h3>
                      <ul className="text-xs text-slate-900 space-y-2 mt-3">
                        <li className="flex flex-wrap gap-4">
                          Quantity <span className="ml-auto">{i.quantity}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price{" "}
                          <span className="ml-auto font-semibold">Rs. {(Number(i.product?.productPrice || 0) * i.quantity).toFixed(2)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                        )):<p>No items.</p>
                    }
                  
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
                      Total <span className="ml-auto">Rs. {total.toFixed(2)}</span>
                    </li>
                  </ul>
                  {/* Proceed to pay yaha thiyo */}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
            <form onSubmit={handleOrderDataSubmission}>
              <div>
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Delivery Details
                </h2>
                <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleOrderDataChange}
                      placeholder="Enter First Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      onChange={handleOrderDataChange}
                      type="text"
                      placeholder="Enter Last Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleOrderDataChange}
                      placeholder="Enter Email"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      onChange={handleOrderDataChange}
                      placeholder="Enter Phone No."
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Province
                    </label>
                    <input
                      type="text"
                      name="province"
                      onChange={handleOrderDataChange}
                      placeholder="Enter Province Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Dsitrict
                    </label>
                    <input
                      type="text"
                      name="district"
                      onChange={handleOrderDataChange}
                      placeholder="Enter District"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleOrderDataChange}
                      placeholder="Enter City"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Tole
                    </label>
                    <input
                      type="text"
                      name="tole"
                      onChange={handleOrderDataChange}
                      placeholder="Enter Tole Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
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
                        onChange={(e) =>
                        setOrderData({
                            ...orderData,
                            paymentMethod: e.target.value as PaymentMethod,
                        })
                        }
                        className="w-5 h-5 cursor-pointer"
                        id="cod"
                    />
                    <label htmlFor="cod" className="ml-4 flex items-center gap-2 cursor-pointer">
                        <span className="text-sm font-medium text-slate-700">Cash on Delivery</span>
                        <Image
                        src="/check-out/COD.jpg"
                        alt="Cash on Delivery"
                        height={54}
                        width={54}
                        className="w-8 h-8"
                        />
                    </label>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with cash when your order is delivered to your doorstep.
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
                        onChange={(e) =>
                        setOrderData({
                            ...orderData,
                            paymentMethod: e.target.value as PaymentMethod,
                        })
                        }
                        className="w-5 h-5 cursor-pointer"
                        id="khalti"
                    />
                    <label htmlFor="khalti" className="ml-4 flex items-center gap-2 cursor-pointer">
                        <span className="text-sm font-medium text-slate-700">Khalti</span>
                        <Image
                        src="/check-out/Khalti.jpg"
                        height={50}
                        width={50}
                        alt="Khalti"
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
              {/* <div className="mt-12 max-w-md">
                <p className="text-slate-900 text-sm font-medium mb-2">
                  Do you have a promo code?
                </p>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Promo code"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div> */}
              <div className="flex item-center mt-8">
                    <button
                      type="submit"
                      className="rounded-md px-4 py-2.5 w-60px text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      Complete Purchase
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
