import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/NavBar/NavBar'
import ContenedorDeGraficos from './components/Graficos/ContenedorDeGraficos'
import Templa from './pages/Templa'
import SidebarComponent from './components/SideBar/SidebarComponent'
import ProductsSidebarDetail from './components/DashboardProducts/ProductsSidebarDetail'
import SellsSidebardDetail from './components/DashboardSell/SellsSidebardDetail'
import { UserProvider } from './context/userContext'
import ClientsTable from './components/DashBoardClients/ClientsTable'
import UsersTable from './components/users/usersTable'
import PurchaseSidebarDetail from './components/DashboardPuchaseDetail/PurchaseSidebarDetail'
import PruebaVentas from './components/DashboardSell/PruebaVentas'



function App() {


  return (
   
        <UserProvider>
            <Navbar />
                <Routes>
                    <Route path="/main" element={<Main/>}></Route>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route> 
                    <Route path="prueba" element={<PruebaVentas/>}></Route>
                    <Route path="productosDashboard" element={<ProductsSidebarDetail/>}></Route>
                    <Route path="ventasDashboard" element={<SellsSidebardDetail/>}></Route>
                    <Route path="comprasDashboard" element={<PurchaseSidebarDetail/>}></Route>
                    <Route path="clientData" element={<ClientsTable/>}></Route>
                    <Route path="usersData" element={<UsersTable/>}></Route>
                </Routes>
          <SidebarComponent/>
        </UserProvider>
   
  )
}

export default App

