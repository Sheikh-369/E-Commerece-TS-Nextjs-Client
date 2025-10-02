import { Status } from "@/lib/global-type/type";

export interface IProductData {
  id: string;
  productName: string;
  productDescription?: string;
  productPrice: string;
  oldPrice?: string; 
  productTotalStock: number;
  productDiscount: number;
  productImage?: string;
  category?:{
    categoryName:string
  }
}

export interface IProductSliceState{
    product:IProductData[],
    selectedProduct: IProductData | null,
    status:Status
}

