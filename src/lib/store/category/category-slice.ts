import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryData, ICategorySliceState } from "./category-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

const initialState:ICategorySliceState={
    categories:[],
    status:Status.IDLE
}

const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategories(state:ICategorySliceState,action:PayloadAction<ICategoryData[]>){
            state.categories=action.payload
        },

        setStatus(state:ICategorySliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        //for data to be at it's own place after edit
        editCategorySuccess: (state, action: PayloadAction<ICategoryData>) => {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
            state.categories[index] = action.payload; // update in place
            }
        }
    }
})

export const{setCategories,setStatus,editCategorySuccess}=categorySlice.actions
export default categorySlice.reducer

//fetch categories
export function fetchAllCategories(){
    return async function fetchAllCategoriesThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.get("category")
            if(response.status===200){
                dispatch(setCategories(response.data.data))
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

//add category
export function addCategory(categoryData:ICategoryData){
    return async function addCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("category",categoryData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllCategories())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//update category
export function updateCategory(categoryData:ICategoryData,id:string){
    return async function updateCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.patch("category/"+id,categoryData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(editCategorySuccess(categoryData)); // update in place
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//delete category
export function deleteCategory(id: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete(`category/${id}`);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllCategories()); // optional if you want fresh data
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
