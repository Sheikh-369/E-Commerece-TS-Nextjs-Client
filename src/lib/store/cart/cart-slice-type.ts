import { Status } from "@/lib/global-type/type";
import { IProductData } from "../products/product-slice-type";

export interface ICartItem{
    id?:string,
    product:IProductData,
    quantity:number,
    productId?:string,
    deletedAt?:string,
}

export interface ICartSliceState{
    items:ICartItem[],
    status:Status
}