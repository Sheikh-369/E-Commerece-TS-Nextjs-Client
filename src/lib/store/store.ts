import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../store/auth/auth-slice"
import productSlice from "../store/products/product-slice"
import usersSlice from "../store/user/user-slice"


const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        users:usersSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>