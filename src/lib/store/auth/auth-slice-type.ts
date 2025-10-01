import { Status } from "@/lib/global-type/type"

export interface IUserData{
    id?:string,
    userName?:string,
    userEmail:string,
    userPassword?:string,
    token?:string
}

export interface IUserSliceState{
    user:IUserData | null,
    status:Status
}