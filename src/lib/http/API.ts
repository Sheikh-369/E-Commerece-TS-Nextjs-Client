import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:3500/ecommerce/",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

export default API