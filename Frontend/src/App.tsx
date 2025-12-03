import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import { Navbar } from './Components/Navbar'
import { Tasks } from './Pages/Tasks'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './Contexts/useAuth'
import PrivateRoute from './Components/PrivateRoute'

function App () {
  return(
    
    <ChakraProvider>
      <Navbar/>

      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/tasks' element={<PrivateRoute><Tasks/></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App