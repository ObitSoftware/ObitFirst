import React from 'react'
import { useEffect, useState } from 'react'
import TablaGenerica from "./TablaGenerica"
import ChooseBranch from '../components/Branch/ChooseBranch'


const Main = () => { 

  return (
    <div className=''> 
      <div className='flex items-start justify-start text-center'>
        <ChooseBranch/>
      </div>
        <div className='flex flex-col items-center mt-12'>
          <TablaGenerica/>
        </div>         
    </div>
  )
}

export default Main
