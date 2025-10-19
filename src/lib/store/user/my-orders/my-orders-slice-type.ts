import { Status } from "@/lib/global-type/type";

export interface IMyOrdersData {
  id: string;
  totalAmount: number;
  createdAt: string;
  payment: {
    paymentStatus: "Paid" | "Pending";
  };
  orderDetails: {
    orderQuantity: number;
    product: {
      productName: string;
      productImage:string;
      productPrice: string;
    };
  }[];
}


export interface IMyOrdersSliceState {
  orders: IMyOrdersData[] | null;
  status:Status
}
