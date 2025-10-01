import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserSliceState } from "./auth-slice-type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

const initialState:IUserSliceState={
    user:null,
    status:Status.IDLE
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state:IUserSliceState,action:PayloadAction<IUserData | null>){
            state.user=action.payload
        },

        setStatus(state:IUserSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setUser,setStatus}=authSlice.actions
export default authSlice.reducer

export function userRegister(userRegisterData:IUserData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("auth/register",userRegisterData)
            if(response.status===200 || response.status===201){
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

export function userLogin(userLoginData: IUserData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("auth/login", userLoginData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));

        const token = response.data.token;

        // Save token in localStorage
        localStorage.setItem("token", token);

        // Dispatch user info without password
        dispatch(setUser({
          userEmail: userLoginData.userEmail,
          token: token,
          userName: "", // add here if backend provides a username
        }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function userLogout() {
  return function userLogoutThunk(dispatch: AppDispatch) {
    localStorage.removeItem("token");  // Remove token from storage
    dispatch(setUser(null));            // Clear user state in Redux
    dispatch(setStatus(Status.IDLE));  // Reset status or set as needed
  };
}

