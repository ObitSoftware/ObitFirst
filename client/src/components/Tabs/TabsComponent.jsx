import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import TableListUsers from "../UsersTable/TableListUsers"
import TableListProducts from "../ProductsTable/TableListProducts"
import TableListSell from "../SellTable/TableListSell"
import TablaDePrueba from "../prueba/TablaDePrueba"


export default function TabsComponent() {
  return (
    <div className="flex w-full flex-col">
      <Tabs  aria-label="Disabled Options">
        <Tab key="Productos" title="Productos">
         
             <TablaDePrueba/>
        
        </Tab>
        <Tab key="Proveedores" title="Proveedores">
         
             <TablaDePrueba/>
            
        </Tab>
        <Tab key="Ventas" title="Ventas">
       
            <TablaDePrueba/>
        
        </Tab>
      </Tabs>
    </div>  
  );
}