import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMyOrdersData, IMyOrdersSliceState } from "./my-orders-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/API-with-token";

const initialState:IMyOrdersSliceState={
    orders:null,
    status:Status.IDLE
}

const myOrderSlice=createSlice({
    name:"myOrders",
    initialState,
    reducers:{
        setOrders(state:IMyOrdersSliceState,action:PayloadAction<IMyOrdersData[]>){
            state.orders=action.payload
        },

        setStatus(state:IMyOrdersSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setOrders,setStatus}=myOrderSlice.actions
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