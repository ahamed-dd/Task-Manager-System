import { useState, useEffect } from "react"
import { logOut, userName } from "../api/loginapi"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { path } from "framer-motion/client"


export function Tasks () {
    const [user, setUser] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        const fetchName = async () => {
            const name = await userName()
            setUser(name)
        }
    })

    const logout = async () => {
        const wait = await logOut()
        if (wait) {
            nav('/')
        }

    }

    return(
        <>
        <h1>Tasks</h1>
        <h5>Welcome back {user}</h5>
        <Button colorScheme="red" onClick={logout} >Logout</Button>
        </>
    )

}