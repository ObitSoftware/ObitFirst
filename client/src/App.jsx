import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import './App.css'

function App() {
 

  useEffect(() => { 
    axios.get("http://localhost:4000/getAllProducts")
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  })


  return (
    <div>
      <h3 className='text-red-600 text-xl underline'>Obit</h3>
    </div>
  )
}

export default App
