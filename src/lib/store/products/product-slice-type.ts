import { Status } from "@/lib/global-type/type";

export interface IProductData {
  id: string;
  productName: string;
  productDescription?: string;
  productPrice: string;
  oldPrice?: string; 
  productTotalStock: number;
  productDiscount: number;
  productImage?:File | string | null;
  categoryId?:string,
  category?:{
    categoryName:string
  },
  deletedAt?:string | null,
}

export interface IProductSliceState{
    product:IProductData[],
    selectedProduct: IProductData | null,
    status:Status
    categoryProducts: Record<string, IProductData[]>;
    // drinks: IProductData[];//for fetching only drinks
    // electronics: IProductData[];//for fetching only electronics
}

