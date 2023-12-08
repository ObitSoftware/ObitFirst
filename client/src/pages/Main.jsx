import React from 'react'
import { useEffect, useState } from 'react'
import TablaGenerica from "./TablaGenerica"
import ChooseBranch from '../components/Branch/ChooseBranch'


const Main = () => { 

  return (
    <div className=''> 
     
        <div className='flex flex-col items-center justify-center mt-24 xl:mt-16 2xl:mt-6 3xl:mt-2 ml-24 xl:ml-18 2xl:ml-12'>
          <TablaGenerica/>
        </div>         
    </div>
  )
}

export default Main
