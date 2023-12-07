import React from 'react'
import { useEffect, useState } from 'react'
import TablaGenerica from "./TablaGenerica"
import ChooseBranch from '../components/Branch/ChooseBranch'


const Main = () => { 

  return (
    <div className=''> 
     
        <div className='flex flex-col items-center justify-center mt-6'>
          <TablaGenerica/>
        </div>         
    </div>
  )
}

export default Main
