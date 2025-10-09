import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData, IProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/API-with-token";

const initialState:IProductSliceState={
    product:[],
    selectedProduct: null,
    categoryProducts: {},
    status:Status.IDLE,
    featured:[]
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
        },

        // setDrinks(state, action) { state.drinks = action.payload },
        // setElectronics(state, action) { state.electronics = action.payload },
        setCategoryProducts(state,action: PayloadAction<{ category: string; products: IProductData[] }>) {
            state.categoryProducts[action.payload.category] = action.payload.products;
        },

        setFeaturedProducts(state, action: PayloadAction<IProductData[]>) {
          state.featured = action.payload;
        }

    }
})

export const {setStatus,setProduct,setSelectedProduct,setCategoryProducts,setFeaturedProducts}=productSlice.actions
export default productSlice.reducer

//fetch products
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

//fetch products by category
export function fetchProductsByCategory(category: string) {
  return async function fetchProductsByCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.get(`product/category/${category}`);
      if (response.status === 200) {
        dispatch(setCategoryProducts({ category, products: response.data.data }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//fetch single product by id
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

//fetch product by isFeatured
export function fetchFeaturedProducts() {
  return async function fetchFeaturedProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.get('product/featured'); // your backend endpoint
      if (response.status === 200) {
        dispatch(setFeaturedProducts(response.data.data)); // IMPORTANT: dispatch action to update state here
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}


//add product
export function addProduct(productData:IProductData){
  return async function addProductThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response=await APIWITHTOKEN.post("product",productData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
      if(response.status===200 || response.status===201){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(fetchProducts())
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

//edit product
export function updateProduct(productData: IProductData, id: string) {
  return async function updateProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`product/${id}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//delete product
export function deleteProduct(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`product/${id}`);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
