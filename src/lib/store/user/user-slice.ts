import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsersData, IUsersSliceState } from "./user-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/API-with-token";
import API from "@/lib/http/API";

const initialState:IUsersSliceState={
    users:[],
    status:Status.IDLE
}

const usersSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers(state:IUsersSliceState,action:PayloadAction<IUsersData[]>){
            state.users=action.payload
        },

        setStatus(state:IUsersSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const {setUsers,setStatus}=usersSlice.actions
export default usersSlice.reducer

//fetch all usrs
export function fetchAllUsers(){
    return async function fetchAllUsersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.get("auth/users")
            if(response.status===200){
                dispatch(setUsers(response.data.data))
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