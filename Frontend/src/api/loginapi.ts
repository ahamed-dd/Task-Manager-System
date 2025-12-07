import axios from "axios"


const BASE_URL = import.meta.env.VITE_API_URL;

export const REGISTER_URL = `${BASE_URL}/accounts/register/`;
export const LOGIN_URL = `${BASE_URL}/accounts/token/`;
export const REFRESH_URL = `${BASE_URL}/accounts/token/refresh/`;
export const AUTH_URL = `${BASE_URL}/accounts/me/`;
export const LOGOUT_URL = `${BASE_URL}/accounts/logout/`;


export const registerUser = async<DT> (user: DT) => {
    try{
        const response = await fetch(`${REGISTER_URL}`, {
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
    
    const response = await axios.post(`${LOGIN_URL}`, 
        {username: username, password: password},
        {withCredentials: true}
    )
    return response.data.success
    }


export async function refreshToken () {
    try{
        await axios.post(`${REFRESH_URL}`, 
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
        const response = await axios.get(`${AUTH_URL}`,
            {withCredentials:true}
         )
         return response.data
        } catch (err) {

            return callRefresh(err, await axios.get(`${AUTH_URL}`,
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
        await axios.post(`${LOGOUT_URL}`,
            {},
            {withCredentials:true}
        )
        return true
    } catch (err) {
        return false
    }
}