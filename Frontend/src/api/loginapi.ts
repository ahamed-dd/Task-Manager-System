import { Fade, Tr } from "@chakra-ui/react";
import axios from "axios"
import { tr } from "framer-motion/client";


const BASE_URL = 'http://127.0.0.1:8000/'

export const registerUser = async<DT> (user: DT) => {
    try{
        const response = await fetch(`${BASE_URL}accounts/register/`, {
            method :"POST",
            headers : {
                'Content-Type': "application/json",
            },
            body : JSON.stringify(user)
        });
        const data = await response.json()
        return data
    }catch (err) {
        console.log("Post Error", err)
    }

}

export async function loginUser<DT>(username: DT, password: DT) {
    
    const response = await axios.post(`${BASE_URL}accounts/token/`, 
        {username: username, password: password},
        {withCredentials: true}
    )
    return response.data.success
    }


export async function refreshToken () {
    try{
        await axios.post(`${BASE_URL}accounts/token/refresh/`, 
        {},
        {withCredentials:true}
    )
    return true
    } catch (err){
        return false
    }
}

export async function userName() {
    try{
        const response = await axios.get(`${BASE_URL}accounts/me/`,
            {withCredentials:true}
         )
         return response.data
        } catch (err) {

            return callRefresh(err, await axios.get(`${BASE_URL}accounts/me/`,
            {withCredentials:true}
         ) )

        }

}

export async function callRefresh(err, func) {
    if (err.response && err.response.status === 401){
        const tokenRefreshed = await refreshToken();
        if (tokenRefreshed){
            const retryResponse = await func()
            return retryResponse.data
        }
    }
    return false
}

export async function logOut() {
    try{
        await axios.post(`${BASE_URL}accounts/logout/`,
            {},
            {withCredentials:true}
        )
        return true
    } catch (err) {
        return false
    }
}