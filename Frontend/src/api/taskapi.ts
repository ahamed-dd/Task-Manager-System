import axios from "axios";
import { tr } from "framer-motion/client";

const GET_URL = 'http://127.0.0.1:8000/tasks/'
const POST_URL = 'http://127.0.0.1:8000/tasks/create/'


export async function allTasks () {
    
    try{
        const response = await axios.get(`${GET_URL}`, {withCredentials:true})
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function writeTasks (obj: object) {
    
    try{
        const response = await axios.post(`${POST_URL}`,
            obj,
            {withCredentials:true})
        return response.data
    } catch (err) {
        console.log("write error", err)
        throw err
    }
}

export async function updateTasks (obj: object, pk: number) {
    
    try{
        const response = await axios.put(`${GET_URL}${pk}/`,
            obj,
            {withCredentials:true})
        return response.data
    } catch (err) {
        console.log("Update error", err)
        throw err
    }
}

export async function deleteTasks (pk: number) {
    
    try{
        const response = await axios.delete(`${GET_URL}${pk}/`,
            {withCredentials:true})
    } catch (err) {
        console.log("Delete error", err)
        throw err
    }
}