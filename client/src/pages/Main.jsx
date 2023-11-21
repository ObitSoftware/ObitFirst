import React from 'react'
import Navbar from '../components/NavBar/NavBar'
import { useEffect, useState } from 'react'
import TablaGenerica from "./TablaGenerica"

const Main = () => { 

  return (
    <div>
        <Navbar/> 
        <div className='flex flex-col items-center mt-36'>
          <TablaGenerica/>
        </div>         
    </div>
  )
}

export default Main
