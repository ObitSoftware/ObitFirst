import React from 'react'
import Navbar from '../components/NavBar/NavBar'
import TabsComponent from '../components/Tabs/TabsComponent'
import { useEffect, useState } from 'react'
import TablaDePrueba from '../components/prueba/TablaDePrueba'

const Main = () => { 

  const [usersTableList, setUsersTableList] = useState(true)

  const showUsers = (x) => {
    if (x === "Ventas") {
      console.log("iii");
    }
  };


  return (
    <div>
        <Navbar/>
        <TabsComponent/>
       
         
    </div>
  )
}

export default Main
