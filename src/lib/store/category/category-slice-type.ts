import { Status } from "@/lib/global-type/type"

export interface ICategoryData{
    id?:string,
    categoryName:string,
    categoryDescription:string,
    createdAt?:string
}

export interface ICategorySliceState{
    categories:ICategoryData[],
    status:Status
}