import React from 'react'
import Navbar from '../components/NavBar/NavBar'
import TableList from "../components/Table/TableList"
import TabsComponent from '../components/Tabs/TabsComponent'
import { useEffect, useState } from 'react'

const Main = () => { 

  const [usersTableList, setUsersTableList] = useState(true)

  const showUsersTable = () => { 
    console.log("ii")
  }


  return (
    <div>
        <Navbar/>
        <TabsComponent showUsers={showUsersTable}/>
         {usersTableList ?  <TableList />  : null}
    </div>
  )
}

export default Main
