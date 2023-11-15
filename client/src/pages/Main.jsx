import React from 'react'
import Navbar from '../components/NavBar/NavBar'
import TabsComponent from '../components/Tabs/TabsComponent'
import { useEffect, useState } from 'react'
import TablaDePrueba from '../components/ProductsTableList/TablaDePrueba'
import TablaGenerica from "./TablaGenerica"

const Main = () => { 

  return (
    <div>
        <Navbar/> 

        <div className='flex flex-col mt-36'>
          <TablaGenerica/>
        </div>

      
         
    </div>
  )
}

export default Main
