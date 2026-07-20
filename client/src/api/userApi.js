import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function getUser(){
    const res = await axiosInstance.get("/user/me");
    return res?.data;
}

export async function register(user){
    const res = await axiosInstance.post("/user/register", {...user})
    console.log(res);
    return res?.data;

}

export async function login(user){
    const res = await axiosInstance.post("/user/login", {...user});
    return res?.data;
}

export async function logout(){
    const res = await axiosInstance.post("/user/logout");
    console.log(res);
    return res?.data;
}