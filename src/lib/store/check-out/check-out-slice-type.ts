import { Status } from "@/lib/global-type/type";

// 
export interface IOrderProduct {
  productId: string;
  orderQuantity: string | number;
}

//
export interface IOrderData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  province: string;
  district: string;
  city: string;
  tole: string;
  totalAmount: string | number;
  paymentMethod: PaymentMethod;
  products: IOrderProduct[];
}

//for payment option
export enum PaymentMethod{
    Khalti="khalti",
    COD="cod"
}

export interface IOrderData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    province: string;
    district: string;
    city: string;
    tole: string;
    totalAmount: string | number;
    paymentMethod: PaymentMethod;
    products: IOrderProduct[];  
}


export interface IOrderItems{
    productId:string,
    quantity:number,
    orderId:string
}

export interface IOrderSliceState{
    items:IOrderItems[],
    khaltiUrl:string | null,
    status:Status
}