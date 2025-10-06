import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserSliceState } from "./auth-slice-type";
import { Status } from "@/lib/global-type/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

// Initial State
const initialState: IUserSliceState = {
  user: null,
  isLoaded: false, // NEW
  loginStatus: Status.IDLE,
  registerStatus: Status.IDLE,
  forgotPasswordStatus: Status.IDLE,
  resetPasswordStatus: Status.IDLE,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state:IUserSliceState, action: PayloadAction<IUserData | null>) {
      state.user = action.payload;
      state.isLoaded = true; // Mark that auth is ready
    },
    
    setLoginStatus(state, action: PayloadAction<Status>) {
      state.loginStatus = action.payload;
    },
    
    setRegisterStatus(state, action: PayloadAction<Status>) {
      state.registerStatus = action.payload;
    },
    
    setForgotPasswordStatus(state, action: PayloadAction<Status>) {
      state.forgotPasswordStatus = action.payload;
    },
    
    setResetPasswordStatus(state, action: PayloadAction<Status>) {
      state.resetPasswordStatus = action.payload;
    },
    
  }
});

// Action Creators
export const {
  setUser,
  setLoginStatus,
  setRegisterStatus,
  setForgotPasswordStatus,
  setResetPasswordStatus,
} = authSlice.actions;

// Reducer Export
export default authSlice.reducer;

//Thunks (Async Actions)

export function loadUserFromStorage() {
  return function (dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setUser({ userEmail: "", token })); // optionally fetch full user info from server
    } else {
      dispatch(setUser(null));
    }
  };
}


// Register
export function userRegister(userRegisterData: IUserData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setRegisterStatus(Status.LOADING));
    try {
      const response = await API.post("auth/register", userRegisterData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setRegisterStatus(Status.SUCCESS));
      } else {
        dispatch(setRegisterStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setRegisterStatus(Status.ERROR));
    }
  };
}

//Login
export function userLogin(userLoginData: IUserData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setLoginStatus(Status.LOADING));
    try {
      const response = await API.post("auth/login", userLoginData);
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        dispatch(setUser({
          userEmail: userLoginData.userEmail,
          token,
        }));

        dispatch(setLoginStatus(Status.SUCCESS));
      } else {
        dispatch(setLoginStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoginStatus(Status.ERROR));
    }
  };
}

//Logout
export function userLogout() {
  return function (dispatch: AppDispatch) {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setLoginStatus(Status.IDLE));
    dispatch(setRegisterStatus(Status.IDLE));
    dispatch(setForgotPasswordStatus(Status.IDLE));
    dispatch(setResetPasswordStatus(Status.IDLE));
  };
}

//Forgot Password
export function forgotPassword(forgotPasswordData: IUserData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setForgotPasswordStatus(Status.LOADING));
    try {
      const response = await API.post("auth/forgot-password", forgotPasswordData);
      if (response.status === 200) {
        dispatch(setForgotPasswordStatus(Status.SUCCESS));
      } else {
        dispatch(setForgotPasswordStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setForgotPasswordStatus(Status.ERROR));
    }
  };
}

//Reset Password
export function resetPassword(resetPasswordData: IUserData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setResetPasswordStatus(Status.LOADING));
    try {
      const response = await API.post("auth/reset-password", resetPasswordData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setResetPasswordStatus(Status.SUCCESS));
      } else {
        dispatch(setResetPasswordStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setResetPasswordStatus(Status.ERROR));
    }
  };
}
