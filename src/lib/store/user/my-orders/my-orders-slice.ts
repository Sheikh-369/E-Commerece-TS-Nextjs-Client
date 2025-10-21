import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMyOrdersData, IMyOrdersSliceState } from "./my-orders-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/API-with-token";

const initialState:IMyOrdersSliceState={
    orders:null,
    selectedOrder: null,
    status:Status.IDLE
}

const myOrderSlice=createSlice({
    name:"myOrders",
    initialState,
    reducers:{
        setOrders(state:IMyOrdersSliceState,action:PayloadAction<IMyOrdersData[]>){
            state.orders=action.payload
        },

        setSelectedOrder(state, action: PayloadAction<IMyOrdersData>) {
            state.selectedOrder = action.payload;
        },

        setStatus(state:IMyOrdersSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setOrders,setStatus,setSelectedOrder}=myOrderSlice.actions
export default myOrderSlice.reducer

//fetch my orders
export function myOrders(){
    return async function myOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("my-orders")
            if(response.status===200){
                dispatch(setOrders(response.data.data))
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

//fetch by id
export function fetchOrderById(orderId: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`/my-orders/${orderId}`);

      if (response.status === 200) {
        dispatch(setSelectedOrder(response.data.data)); // ✅ Use correct action
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (err: any) {
      console.error("Order fetch failed:", err);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// cancelOrder
export function cancelOrder(orderId: string) {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch(`/order/${orderId}/cancel`);

      if (response.status === 200) {
        // Refresh orders after cancellation
        dispatch(myOrders());
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || "Cancellation failed" };
      }
    } catch (error: any) {
      console.error("Cancel order error:", error);
      return { success: false, message: "Something went wrong" };
    }
  };
}

