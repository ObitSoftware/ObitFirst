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
import { UserProvider } from './context/userContext'
import ClientsTable from './components/DashBoardClients/ClientsTable'
import UsersTable from './components/users/usersTable'
import DashboardPurchase from './components/DashboardPuchaseDetail/DashboardPurchase'
import DashboardSells from './components/DashboardSell/DashboardSells'
import DashboardProducts from './components/DashboardProducts/DashboardProducts'
import DashboardProviders from './components/DashboardProviders/DashboardProviders'




function App() {

  const location = useLocation();

  if (location.pathname === '/ventasDashboard' || location.pathname === '/comprasDashboard' || location.pathname === '/productosDashboard' || location.pathname === '/proveedoresDashboard') {
    document.body.style.backgroundColor = '#E6F4FF';
  } else {
    document.body.style.backgroundColor = 'white';
  }

  return (
   
        <UserProvider>
            <Navbar />
                <Routes>
                    <Route path="/main" element={<Main/>}></Route>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route> 
                    <Route path="ventasDashboard" element={<DashboardSells/>}></Route>
                    <Route path="comprasDashboard" element={<DashboardPurchase/>}></Route>
                    <Route path="productosDashboard" element={<DashboardProducts/>}></Route>    
                    <Route path="proveedoresDashboard" element={<DashboardProviders/>}></Route>    
                    <Route path="clientData" element={<ClientsTable/>}></Route>
                    <Route path="usersData" element={<UsersTable/>}></Route>    
                    
                </Routes>
          <SidebarComponent/>
        </UserProvider>
   
  )
}

export default App



