import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useRef } from "react";
import Loading from "../components/LoadingComponent/Loading";
import FiltersModal from "../components/Modals/FiltersModal";
import AddProductModal from "../components/Modals/AddProductModal";
import { SearchIcon } from "../components/icons/SearchIcon";
import DeleteProductModal from "../components/Modals/DeleteProductModal";
import EditProducModal from "../components/Modals/EditProductModal";


const Tabla = () => {
    const tableRef = useRef(null);
    const [activeTab, setActiveTab] = useState('productos');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [load, setLoad] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
  
    useEffect(() => {
      axios.get(`http://localhost:3000/${activeTab}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data)
            const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id');
            const columnObjects = propiedades.map(propiedad => ({
                key: propiedad,
                label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
          }));

          columnObjects.push({
            key: 'Eliminar',
            label: 'Eliminar',
            cellRenderer: (cell) => <DeleteProductModal producto={cell.row.original} />
          });
      
         {activeTab === "productos" ?    
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const name = filaActual.original.nombre;
                        const description = filaActual.original.descripcion;
                        const price = filaActual.original.precio;
                        const quantity = filaActual.original.cantidad;
                        const category = filaActual.original.categoria;
                        const stock = filaActual.original.stock;
                        const id = filaActual.original._id;
                        
                        const producto = {
                        nombre: name,
                        descripcion: description,
                        precio: price,
                        cantidad: quantity,
                        categoria: category,
                        stock: stock,
                        productId: id
                        };
                        
                        return (
                        <EditProducModal producto={producto} type={"productos"} />
                        );
                    },
                }) :
            null}

            {activeTab === "proveedores" ?    
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const proveedorId = filaActual.original.proveedorId;
                        const nombre = filaActual.original.nombre;
                        const telefono = filaActual.original.telefono;
                        const id = filaActual.original._id;
                        
                        const producto = {
                        proveedorId: proveedorId,
                        nombre: nombre,
                        telefono: telefono,
                        proveedorIdUnique: id
                        };
                        
                        return (
                         <EditProducModal producto={producto} type={"proveedores"} />
                        );
                    },
                }) :
            null}



          
          setColumns(columnObjects);

          if (tableRef.current) {
            tableRef.current.updateColumns(columnObjects);
          }
          setTimeout(() => { 
            setLoad(false)
          }, 1000)
        })
        .catch((err) => {
          console.log(err);
        });
    }, [activeTab]);


    const filteredData = data.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  
    return (
        <>
     
     {load ? (
            <div className="flex items-center justify-center mt-44">
                <Loading text={activeTab === "productos" ? "Cargando Productos.." : "Cargando Proveedores.."} />
            </div>
            )  :
            <div className="mt-6">
            <div className="flex justify-between items-start m-4" style={{backgroundColor:"#E6EFFF"}}>
               <div className="flex justify-start items-center m-4 gap-8">
                  <FiltersModal />
                  <div className="tabs tabs-boxed gap-4" style={{backgroundColor:"#E6EFFF"}}>
                            <a className="tab bg-white text-black hover:text-gray-400" onClick={() => setActiveTab("productos")}>Productos</a>
                            <a className="tab bg-white text-black hover:text-gray-400" onClick={() => setActiveTab("proveedores")}>Proveedores</a>
                            <a className="tab bg-white text-black hover:text-gray-400">Ventas</a>
                        </div>
                </div>    
                <div className="flex justify-end items-center m-4">
                  <AddProductModal text={activeTab === "productos" ? "PRODUCTO" : "PROVEEDOR"}/>
                </div>      
            </div>
            <div className="flex items-start m-2">
                <Input style={{border: "none"}}
                    classNames={{ base: "w-full sm:max-w-[40%]" }} 
                    disableFilled={true}
                    startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                    placeholder="Buscador"
                    size="xxs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
            </div>
            
            <Table  
               columnAutoWidth={true}
               columnSpacing={10}
               aria-label="Selection behavior table example with dynamic content"
               selectionMode="multiple"
               selectionBehavior={selectionBehavior}
               className="w-[1250px] h-[676px] text-center"
               >
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key} className="text-center">{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={filteredData}>
                    {(item) => (
                        <TableRow key={item.nombre}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                            {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
                            </TableCell>
                        ))}
                        </TableRow>
                    )}
              </TableBody>
            </Table>
            </div>
            }  
        </>
      
    );
  };
  
  export default Tabla;
