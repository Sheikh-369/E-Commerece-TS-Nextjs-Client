import { Status } from "@/lib/global-type/type"

export interface IUserData{
    id?:string,
    userName?:string,
    userEmail:string,
    userPhoneNumber?:string,
    userPassword?:string,
    token?:string,
    OTP?:number | string,
    newPassword?:string
}

export interface IUserSliceState{
    user:IUserData |null,
     isLoaded: boolean; // NEW
    loginStatus: Status;
    registerStatus: Status;
    forgotPasswordStatus: Status;
    resetPasswordStatus: Status;
}