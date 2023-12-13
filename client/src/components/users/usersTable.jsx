import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react'
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input, Pagination} from "@nextui-org/react";
import DeleteProductModal from "../Modals/DeleteProductModal";
import EditModal from "../Modals/EditModal";
import FiltersModal from '../Modals/FiltersModal';
import AddClientModal from '../Modals/AddClientModal';
import PaginationTable from '../Pagination/Pagination';
import Loading from '../LoadingComponent/Loading';
import { useRef } from 'react';

const UsersTable = () => {

    const [data, setData] = useState([]);
    const tableRef = useRef(null);

    const [columns, setColumns] = useState([]);
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [load, setLoad] = useState(true)
    const [sliceData, setSliceData] = useState([])
    const [firstNumberOfSlice, setFirstNumberOfSlice] = useState(0)
    const [secondNumberOfSlice, setSecondNumberOfSlice] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")

  
    const showClientsUpdated = () => {
        axios.get("http://localhost:3000/usuario")
             .then((res) => {
              const allData = res.data
              const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
              setSliceData(newArrayFiltered)
            })
            .catch((err) => {
              console.log(err);
            });
      };

 
            useEffect(() => { 
                axios.get(`http://localhost:3000/usuario`)
                .then((res) => {
                    setData(res.data);
                    console.log(res.data)
                    const newArrayFiltered = res.data.slice(firstNumberOfSlice, secondNumberOfSlice)
                    setSliceData(newArrayFiltered)
                    const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'password');
                    const columnObjects = propiedades.map(propiedad => ({
                        key: propiedad,
                        label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                        allowsSorting: true
                    }));

                    columnObjects.push({
                        key: 'Editar',
                        label: 'Cambiar de Rol',
                        cellRenderer: (cell) => { 
                            const filaActual = cell.row;
                            const name = filaActual.original.nombre;
                            const telephone = filaActual.original.telefono;
                            const email = filaActual.original.email;
                            const dni = filaActual.original.dni;
                            const id = filaActual.original._id;                  
                            const producto = {
                            nombre: name,
                            telefono: telephone,
                            email: email,
                            dni: dni,
                            productId: id,                  
                            };
                            return (
                            <EditModal producto={producto} type={"clientes"}  showClientsUpdated={showClientsUpdated}/>
                            );
                        },
                    }) 
 
                    columnObjects.push({
                        key: 'Editar',
                        label: 'Editar Datos',
                        cellRenderer: (cell) => { 
                            const filaActual = cell.row;
                            const name = filaActual.original.nombre;
                            const telephone = filaActual.original.telefono;
                            const email = filaActual.original.email;
                            const dni = filaActual.original.dni;
                            const id = filaActual.original._id;                  
                            const producto = {
                            nombre: name,
                            telefono: telephone,
                            email: email,
                            dni: dni,
                            productId: id,                  
                            };
                            return (
                            <EditModal producto={producto} type={"clientes"}  showClientsUpdated={showClientsUpdated}/>
                            );
                        },
                    }) 

                    columnObjects.push({
                        key: 'Eliminar',
                        label: 'Eliminar Cuenta',
                        cellRenderer: (cell) => { 
                          const filaActual = cell.row;
                          const name = filaActual.original.nombre;
                          const id = filaActual.original._id;
                          const producto = {
                          nombre: name,
                          productId: id
                          };
                          return (
                            <DeleteProductModal producto={producto} type={"clientes"} showClientsUpdated={showClientsUpdated}/>
                            );
                      },
                        }) 
  
                  
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
                }, [secondNumberOfSlice, firstNumberOfSlice]);

                const filteredData = sliceData.filter((item) => {
                    return Object.values(item).some((value) =>
                      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  });

                  const firstNumSlice = (x) => { 
                    setFirstNumberOfSlice(x)
                  }
            
                  const secondNumSlice = (x) => { 
                    setSecondNumberOfSlice(x)
                  }


  return (
     <div>
       <div>
       {load ? (
        <div className="flex items-center justify-center mt-44">
          <Loading text={"Cargando Usuarios.."} />
        </div>
      ) : (
        <div className="w-full">
        
      <div className="flex justify-between items-start rounded-t-lg rounded-b-none w-full mt-2 xl:mt-2 3xl:mt-12 " style={{backgroundColor:"#E6EFFF"}}>
           <div className="flex justify-start items-center m-4 gap-8">
              <FiltersModal />
              <div className="tabs tabs-boxed gap-4" style={{backgroundColor:"#E6EFFF"}}>
                        <a className="tab text-white hover:text-white" style={{ backgroundColor:"#728EC3"}}>Usuarios</a>                  
                    </div>
            </div>    
            <div className="flex justify-end items-center m-4">
              <AddClientModal/>
            </div>      
        </div>
        <div className="flex items-start m-2">
               <input
                className="w-[35%] border border-gray-200  focus:border-gray-300 focus:ring-0 h-10 rounded-xl"
                style={{background:"#FFFFFF"}}
                placeholder="Buscador.."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                />
                
        </div>
        <Table  
            columnAutoWidth={true}
            columnSpacing={10}
            aria-label="Selection behavior table example with dynamic content"
            selectionMode="none"
            selectionBehavior={selectionBehavior}
            className="w-full lg:-w[800px] xl:w-[1100px] 2xl:w-[1400px] h-auto text-center shadow-left-right "
        >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="text-center "
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={filteredData} className="flex items-start justify-start">
          {(item) => (
           <TableRow key={item._id} className="">
              {columns.map((column) => (
                <TableCell align="center" key={column.key}   className={`text-center text-black dark:text-black`}>
                  {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
        <div className="flex items-center justify-center text-center mt-2">
           <PaginationTable firstNumberToSliceData={firstNumSlice} secondNumberToSliceData={secondNumSlice}/>
        </div>
    </div>
    )}

    </div>
     </div>
  )
}

export default UsersTable
