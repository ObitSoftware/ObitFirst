import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import './App.css'
import TableList from './components/Table/TableList'
import NavBar from './components/NavBar/NavBar'

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
      <NavBar/>
      <TableList/>
    </div>
  )
}

export default App
