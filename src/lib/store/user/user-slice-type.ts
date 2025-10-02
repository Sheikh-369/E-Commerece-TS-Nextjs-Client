import { Status } from "@/lib/global-type/type";

export interface IUsersData{
    id:string,
    userName:string,
    userEmail:string,
    userPhoneNumber:string,
    createdAt:string,
}

export interface IUsersSliceState{
    users:IUsersData[],
    status:Status
}