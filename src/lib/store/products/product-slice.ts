import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData, IProductSliceState } from "./product-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/API-with-token";

const initialState:IProductSliceState={
    product:[],
    selectedProduct: null,
    // drinks:[],
    // electronics:[],
    categoryProducts: {},
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
        },

        // setDrinks(state, action) { state.drinks = action.payload },
        // setElectronics(state, action) { state.electronics = action.payload },
        setCategoryProducts(state,action: PayloadAction<{ category: string; products: IProductData[] }>) {
            state.categoryProducts[action.payload.category] = action.payload.products;
        }

    }
})

export const {setStatus,setProduct,setSelectedProduct,setCategoryProducts}=productSlice.actions
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


// Thunk for fetching drinks
// export function fetchDrinks() {
//   return async function fetchDrinksThunk(dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING)); // Start loading state

//     try {
//       const response = await API.get('product/category/drinks'); // Fetch drinks
//       if (response.status === 200) {
//         dispatch(setDrinks(response.data.data)) // Update products
//         dispatch(setStatus(Status.SUCCESS)); // Success state
//       } else {
//         dispatch(setStatus(Status.ERROR)); // Error state if failure
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(setStatus(Status.ERROR)); // Handle error
//     }
//   };
// }

// Thunk for fetching electronics
// export function fetchElectronics() {
//   return async function fetchElectronicsThunk(dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING)); // Start loading state

//     try {
//       const response = await API.get('product/category/electronics'); // Fetch electronics
//       if (response.status === 200) {
//         dispatch(setElectronics(response.data.data)) // Update products
//         dispatch(setStatus(Status.SUCCESS)); // Success state
//       } else {
//         dispatch(setStatus(Status.ERROR)); // Error state if failure
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(setStatus(Status.ERROR)); // Handle error
//     }
//   };
// }

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