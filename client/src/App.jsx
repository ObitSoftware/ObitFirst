import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'

import Navbar from './components/NavBar/NavBar'



function App() {
 

  return (
    <div>
       <Navbar />
       <Routes>
          <Route path="/main" element={<Main/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
       
       </Routes>
    </div>
  )
}

export default App

