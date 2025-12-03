import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginapi";
import { VStack, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useAuth } from "../Contexts/useAuth";

export function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth()

  const handlelogin = async (username, password) => {
    try{
      await login(username, password)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <VStack>
      <h2>Login Page</h2>
      <br></br>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <input
        type="text"
        value={Username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      
      <FormControl>
        <FormLabel>Password</FormLabel>
        <input
        type="password"
        value={Password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        />
        {err && <div style={{ color: "red" }}>{err}</div>}
      </FormControl>
      
      <Button onClick={() => {handlelogin(Username, Password)}}>Login</Button>
    </VStack>
)}
