import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../store/auth/auth-slice"
import productSlice from "../store/products/product-slice"
import usersSlice from "../store/user/user-slice"
import categorySlice from "../store/category/category-slice"
import cartSlice from "../store/cart/cart-slice"


const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        users:usersSlice,
        categories:categorySlice,
        cart:cartSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>