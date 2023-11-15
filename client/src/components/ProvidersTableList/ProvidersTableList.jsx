import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import EditProductModal from "../Modals/EditProductModal"
import DeleteProductModal from "../Modals/DeleteProductModal"
import {SearchIcon} from "../UsersTable/SearchIcon";
import Loading from "../LoadingComponent/Loading";
import AddProductModal from "../Modals/AddProductModal";
import FiltersModal from "../Modals/FiltersModal";



export default function ProvidersTableList() {

  const [allProviders, setAllProviders] = useState([]);
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios.get("http://localhost:3000/proveedores") 
      .then((res) => {
        setAllProviders(res.data);
        console.log(res.data)   
        setTimeout(() => { 
          setLoading(false)
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const columns = [
    {
      key: "proveedorId", 
      label: "Nombre",
    },
    {
      key: "nombre",
      label: "Proveedor",
    },
    {
      key: "telefono",
      label: "Telefono",
    },

    {
      key: "Eliminar",
      label: "Eliminar",
    },
    {
      key: "Editar",
      label: "Editar",
    },
  ];


  const allProvidersSaved = allProviders.map((provider) => ({
    proveedorId: provider.proveedorId,
    nombre: provider.nombre,
    telefono: provider.telefono,
    Eliminar: <DeleteProductModal/>,
    Editar:   <EditProductModal />
  }));

  const filteredProviders = allProvidersSaved.filter((provider) => {
   
  
    return (
      provider.proveedorId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.telefono.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });
 
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");


  return (
    <>
    { loading ? 
    <div className="flex items-center justify-center mt-44">
      <Loading text={"Cargando Proveedores"}/>
    </div>    
       :
      <div className="mt-6">
        <div className="flex justify-between items-start m-4" style={{backgroundColor:"#E6EFFF"}}>
           <div className="flex justify-start items-center m-4">
              <FiltersModal />
            </div>    
            <div className="flex justify-end items-center m-4">
              <AddProductModal text={"PROVEEDOR"}/>
            </div>      
        </div>
        <div className="flex items-start m-2">
            <Input style={{border: "none",  outline: "none", ":focus": { border: "none", }, ":active": { border: "none" },}}
                classNames={{ base: "w-full sm:max-w-[40%]" }} 
                disableFilled={true}
                startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                placeholder="Buscador"
                size="xxs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
        <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior} className="w-[1195px] h-[676px]">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={filteredProviders}>
            {(item) => (
              <TableRow key={item.proveedorId}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  }
  </>
  );
}

{/* 
  <div className="mt-6">
        <div className="flex justify-between w-full " style={{backgroundColor:"#E6EFFF"}}>
            <div className="flex justify-start items-center m-4">
              <FiltersModal />
            </div>    
            <div className="flex justify-end items-center m-4">
              <AddProductModal text={"PRODUCTO"}/>
            </div>      
        </div>
        <div className="flex items-start m-2">
            <Input style={{border: "none",  outline: "none", ":focus": { border: "none", }, ":active": { border: "none" },}}
                classNames={{ base: "w-full sm:max-w-[40%]" }} 
                disableFilled={true}
                startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                placeholder="Buscador"
                size="xxs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
*/}

