import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderData, IOrderItems, IOrderSliceState } from "./check-out-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/API-with-token";

const initialState:IOrderSliceState={
    items:[],
    khaltiUrl:null,
    status:Status.IDLE
}

const checkOutSlice=createSlice({
    name:"checkOut",
    initialState,
    reducers:{
        setItems(state:IOrderSliceState,action:PayloadAction<IOrderItems[]>){
            state.items=action.payload
        },

        setStatus(state:IOrderSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        setKhaltiUrl(state:IOrderSliceState,action:PayloadAction<string>){
            state.khaltiUrl=action.payload
        }
    }
})

export const{setItems,setStatus,setKhaltiUrl}=checkOutSlice.actions
export default checkOutSlice.reducer

// export function createAnOrder(finalData:IOrderData){
//     return async function createAnOrderThunk(dispatch:AppDispatch){
//         dispatch(setStatus(Status.LOADING))
//         try {
//             const response=await APIWITHTOKEN.post("order",finalData)
//             if(response.status===200 || response.status===201){
//                 dispatch(setItems(response.data.data))
//                 dispatch(setStatus(Status.SUCCESS))
//                 if(response.data.url){
//                     setKhaltiUrl(response.data.url)
//                     window.location.href=response.data.url
//                 }
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }

export function createAnOrder(finalData: IOrderData) {
  return async function createAnOrderThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/order", finalData);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));

        // ✅ Correctly access the payment URL
        const paymentUrl = response.data.data?.payment_url;
        if (paymentUrl) {
          dispatch(setKhaltiUrl(paymentUrl)); // dispatch to Redux
          window.location.href = paymentUrl; // Redirect
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
