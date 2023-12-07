import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/NavBar/NavBar'
import ContenedorDeGraficos from './components/Graficos/ContenedorDeGraficos'
import Templa from './pages/Templa'
import Prueba from './components/Prueba'
import Otro from './components/Otro'




function App() {
 

  return (
    <div>
       <Navbar />

        <Routes>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route> 
            <Route path="prueba" element={<ContenedorDeGraficos/>}></Route>
            <Route path="tt" element={<Templa/>}></Route>
            <Route path="pruebaa" element={<Prueba/>}></Route>
            <Route path="otro" element={<Otro/>}></Route>
        </Routes>
       <Otro/>

    </div>
  )
}

export default App

