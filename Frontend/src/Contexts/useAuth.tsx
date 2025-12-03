import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { userName, loginUser, logOut } from '../api/loginapi';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const nav = useNavigate()
    const location = useLocation();

    const getAuthenticatedUser = async () => {
        try{
            const user = await userName();
            setUser(user);
        } catch (err) {

            setUser(null);
        }finally{
            setLoading(false);
        }
    }

    const logoutUser = async () => {
        try{
        await logOut();
        } catch (err) {
          console.log(err)
        } finally{
            setUser(null)
            nav('/home')
        }
    }
    
    // not yet used
    const registerUser = async (username, email, password, confirm_password) => {
      try {
        if (password === confirm_password) {
          await register(username, email, password)
          alert('User successfully registered')
          nav('/login')
        }
      } catch {
        alert('error registering user')
      }
    }

    const login = async (username, password) => {
        const user = await loginUser(username, password)
        if (user) {
          setUser(user)
          nav('/tasks')
        } else {
          alert('Incorrect username or password')
        }
    }

    useEffect(() => {
        getAuthenticatedUser();
    }, [location.pathname])

    return (
  <AuthContext.Provider value={{ user, loading, login, logoutUser }}>
    {children}
  </AuthContext.Provider>
);


}
export const useAuth = () => useContext(AuthContext);
