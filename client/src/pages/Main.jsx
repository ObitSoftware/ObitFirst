import React from 'react'
import { useEffect, useState } from 'react'
import TablaGenerica from "./TablaGenerica"
import ChooseBranch from '../components/Branch/ChooseBranch'
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from 'react-router-dom';


const Main = () => { 

  const userCtx = useContext(UserContext)

  return (
    <div className=''>   
        <div className='flex flex-col items-center justify-center mt-24 xl:mt-16 2xl:mt-6 3xl:mt-2 ml-24 xl:ml-18 2xl:ml-12'>
        {userCtx.userId && userCtx.userId.length >= 10 ? 
          <TablaGenerica/> 
        :
        <div>
          <p style={{color:"#728EC3"}} className='text-lg font-medium'>Debes iniciar Sesion</p>     
          <Link to={"/"}><p className='text-sm font-bold mt-8' style={{color:"#728EC3"}}> Iniciar sesion </p></Link>   
        </div>
        }
        </div>         
    </div>
  )
}

export default Main
