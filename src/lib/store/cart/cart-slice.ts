import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartSliceState } from "./cart-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

const initialState:ICartSliceState={
    items:[],
    status:Status.IDLE
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setItems(state:ICartSliceState,action:PayloadAction<ICartItem[]>){
            state.items=action.payload
        },

        setStatus(state:ICartSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export  const{setItems,setStatus}=cartSlice.actions
export default cartSlice.reducer

//add to cart
export function addToCart(productId:string){
    return async function addToCartThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("cart",{
                productId: productId,
                quantity: 1,
            })
            if(response.status===200){
                dispatch(setItems(response.data.data))
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

//fetch cart items
export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.get("cart")
            if(response.status===200 || response.status===201){
                dispatch(setItems(response.data.data))
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