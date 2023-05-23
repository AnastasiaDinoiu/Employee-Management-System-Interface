import axios from "axios";

export default function axiosInstance(){
    return axios.create({
        baseURL: "http://127.0.0.1:8080/",
        timeout: 50000
    })
}