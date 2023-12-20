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
import { UserProvider } from './context/userContext'
import ClientsTable from './components/DashBoardClients/ClientsTable'
import UsersTable from './components/users/usersTable'
import PurchaseSidebarDetail from './components/DashboardPuchaseDetail/PurchaseSidebarDetail'
import DashboardSells from './components/DashboardSell/DashboardSells'
import PruebaCompras from './components/DashboardPuchaseDetail/PruebaCompras'



function App() {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/ventasDashboard'  || '/prueba') {
      document.body.style.backgroundColor = '#E6F4FF';
    }  else {
      document.body.style.backgroundColor = 'white';
    }
  }, [location]);

  return (
   
        <UserProvider>
            <Navbar />
                <Routes>
                    <Route path="/main" element={<Main/>}></Route>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route> 
                    <Route path="productosDashboard" element={<ProductsSidebarDetail/>}></Route>
                    <Route path="ventasDashboard" element={<DashboardSells/>}></Route>
                    <Route path="comprasDashboard" element={<PurchaseSidebarDetail/>}></Route>
                    <Route path="clientData" element={<ClientsTable/>}></Route>
                    <Route path="usersData" element={<UsersTable/>}></Route>
                    <Route path="prueba" element={<PruebaCompras/>}></Route>
                </Routes>
          <SidebarComponent/>
        </UserProvider>
   
  )
}

export default App



