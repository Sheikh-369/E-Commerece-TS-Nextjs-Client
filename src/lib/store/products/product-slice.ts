import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData, IProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

const initialState:IProductSliceState={
    product:[],
    selectedProduct: null,
    status:Status.IDLE
}

const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct(state:IProductSliceState,action:PayloadAction<IProductData[]>){
            state.product=action.payload
        },

        setSelectedProduct(state, action: PayloadAction<IProductData>) {
            state.selectedProduct = action.payload;
        },

        setStatus(state:IProductSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const {setStatus,setProduct,setSelectedProduct}=productSlice.actions
export default productSlice.reducer

export function fetchProducts(){
    return async function fetchProductsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.get("product")
            if(response.status===200){
                dispatch(setProduct(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchProductById(id: string) {
  return async function fetchProductByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`product/${id}`);
      if (response.status === 200) {
        dispatch(setSelectedProduct(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
