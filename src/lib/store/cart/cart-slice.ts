import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartSliceState } from "./cart-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/API-with-token";

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
        },

        updateItemQuantity(state: ICartSliceState, action: PayloadAction<{ cartItemId: string, quantity: number }>) {
            const { cartItemId, quantity } = action.payload;
            const item = state.items.find(i => i.id === cartItemId);
            if (item) item.quantity = quantity;
}

    }
})

export  const{setItems,setStatus,updateItemQuantity}=cartSlice.actions
export default cartSlice.reducer

//add to cart
export function addToCart(productId:string,quantity:number){
    return async function addToCartThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post("cart",{
                productId: productId,
                quantity,
            })
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchCartItems())
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
            const response=await APIWITHTOKEN.get("cart")
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

//delete cart item
export function deleteCartItems(cartItemId?:string){
    return async function deleteCartItemsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete("cart/"+cartItemId)
            if(response.status===200 || response.status===201){
                // dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchCartItems())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//multiple-delete by selcting
export function deleteMultipleCartItems(ids: string[]) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      await Promise.all(ids.map(id => APIWITHTOKEN.delete("cart/" + id)));
      dispatch(fetchCartItems());
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//edit cart item/s
export function updateCartItemQuantity(cartItemId: string, quantity: number) {
    return async function updateCartItemThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIWITHTOKEN.patch(`cart/${cartItemId}`, { quantity });
            if (response.status === 200) {
                // update only that item in Redux
                dispatch(updateItemQuantity({ cartItemId, quantity }));
                dispatch(setStatus(Status.SUCCESS));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}


