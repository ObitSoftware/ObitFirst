import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useRef } from "react";
import Loading from "../LoadingComponent/Loading";
import FiltersModal from "../Modals/FiltersModal";
import AddProductModal from "../Modals/AddProductModal";
import { SearchIcon } from "../icons/SearchIcon";
import DeleteProductModal from "../Modals/DeleteProductModal";
import EditModal from "../Modals/EditModal";
import AddProviderModal from "../Modals/AddProviderModal";
import AddSellModal from "../Modals/AddSellModal"
import ViewBuyDetail from "../Modals/ViewBuyDetail"
import PaginationTable from "../Pagination/Pagination";
import AddBuyModal from "../Modals/AddBuyModal";


const BuysTable = ({comeBack}) => {

    const tableRef = useRef(null);
    const [activeTab, setActiveTab] = useState('productos');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [load, setLoad] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [sliceData, setSliceData] = useState([])
    const [firstNumberOfSlice, setFirstNumberOfSlice] = useState(0)
    const [secondNumberOfSlice, setSecondNumberOfSlice] = useState(10)


    const showBuysUpdated = () => {
      axios.get("http://localhost:3000/compras")
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
      
        axios.get("http://localhost:3000/compras")
        .then((res) => {
            setData(res.data);
            console.log("compras", res.data)
            const newArrayFiltered = res.data.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
            console.log(res.data)
            const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'productosComprados'  && propiedad !== 'compraId' );
            const columnObjects = propiedades.map(propiedad => ({
                key: propiedad,
                label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                allowsSorting: true
          }));

          columnObjects.push({
            key: 'VerDetalle',
            label: 'Detalle de Compra',
            cellRenderer: (cell) => { 
              const filaActual = cell.row;
              const id = filaActual.original._id;
              const buyDetail = filaActual.original.productosComprados;
              const dateOfBuy = filaActual.original.fechaCompra;
              const total = filaActual.original.total;
              const producto = {
              id: id,
              detail: buyDetail,
              date: dateOfBuy,
              };
              return (
                <ViewBuyDetail  producto={producto} totalAmount={total}/> 
                );
          },
            }) 

            columnObjects.push({
              key: 'Vendedor',
              label: 'Proveedores',
              cellRenderer: (cell) => { 
                const filaActual = cell.row;
                const id = filaActual.original._id;
                const purchasedProducts = filaActual.original.productosComprados;
                const getProviders = purchasedProducts.map((prod) => prod.proveedor)
                const providers = getProviders
                console.log(providers)
                return (
                    <p>{providers.length === 1 ? providers[0] : providers.length === 2 ? [providers[0], " - " ,providers[1]] : null}</p>
                  );
            },
              }) 

          
            columnObjects.push({
                  key: 'Eliminar',
                  label: 'Eliminar',
                  cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const producto = {
                    id: id
                    };
                    return (
                      <DeleteProductModal producto={producto} type={"compras"}  updateBuysList={showBuysUpdated}/>
                      );
                },
                  }) 
       
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const compraId = filaActual.original.compraId;
                        const productosComprados = filaActual.original.productosComprados;
                        const fechaCompra = filaActual.original.fechaCompra;
                        const total = filaActual.original.total;
                        const id = filaActual.original._id;
                        
                        const producto = {
                        compraId: compraId,
                        productosComprados: productosComprados,
                        fechaCompra: fechaCompra,
                        total: total,
                        id: id,
                        };
                        return (
                        <EditModal producto={producto} type={"compras"} />
                        );
                    },
                }) 

                    
                    setColumns(columnObjects);

                    if (tableRef.current) {
                        tableRef.current.updateColumns(columnObjects);
                    }
                    setTimeout(() => { 
                        setLoad(false)
                    }, 200)
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

                    useEffect(() => { 
                        console.log(filteredData)
                    }, [filteredData, secondNumberOfSlice, firstNumberOfSlice])

                    function sortData(data, columnKey, sortDirection) {
                        const sortedData = [...data];
                      
                        if (columnKey === "total") {
                          sortedData.sort((a, b) => (sortDirection === "asc" ? a.total - b.total : b.total - a.total));
                        } 
                      
                        return sortedData; 
                      }
                
                      let sortDirection = "asc";

                      const firstNumSlice = (x) => { 
                        setFirstNumberOfSlice(x)
                      }
                
                      const secondNumSlice = (x) => { 
                        setSecondNumberOfSlice(x)
                      }
  
    return (
        <>
     
     {load ? (
            <div className="flex items-center justify-center mt-22">
                <Loading text="Cargando Compras.." />
            </div>
            )  :
            <div className="mt-6">
             <div className="flex justify-between items-start rounded-t-lg rounded-b-none w-full" style={{backgroundColor:"#E6EFFF"}}>
               <div className="flex justify-start items-center m-4 gap-8">
                  <FiltersModal />
                  <div className="tabs tabs-boxed gap-4" style={{backgroundColor:"#E6EFFF"}}>
                  <div className="tabs tabs-boxed gap-4" style={{backgroundColor:"#E6EFFF"}}>
                            <a className="tab text-white hover:text-white" style={{backgroundColor:"#A6BBE4"}} onClick={() => comeBack()}>Productos</a>
                            <a className="tab text-white hover:text-white" style={{backgroundColor:"#A6BBE4"}} onClick={() => comeBack()}>Proveedores</a>
                            <a className="tab text-white hover:text-white" style={{backgroundColor:"#A6BBE4"}} onClick={() => comeBack()}>Ventas</a>
                            <a className="tab text-white hover:text-white" style={{backgroundColor:"#728EC3"}}>Compras</a>
                        </div>
                        </div>
                </div>    
                    <div className="flex justify-end items-center m-4">
                       <AddBuyModal updateList={showBuysUpdated}/>
                    </div>      
            </div>
            <div className="flex items-start m-2">
                   <input
                     className="w-[40%] border border-gray-200  focus:border-gray-300 focus:ring-0 h-10 rounded-xl"
                    placeholder="Buscador"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
            </div>
            
            <Table 
            columnAutoWidth={true} 
            columnSpacing={10}  
            aria-label="Selection behavior table example with dynamic content"   
            selectionMode="multiple" 
            selectionBehavior={selectionBehavior} 
            className="w-full 2xl:w-[1500px]  h-auto text-center shadow-left-right"
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                        key={column.key}
                        className="text-center"
                        allowsSorting={column.key === "total"}
                        onClick={() => {
                            if (column.key === "total") {
                            const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
                            const sortedData = sortData(data, column.key, newSortDirection);

                            setData(sortedData);
                            sortDirection = newSortDirection;
                            }
                        }}
                        >
                        {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filteredData}>
                    {(item) => (
                    <TableRow key={item._id}>
                        {columns.map((column) => (
                    <TableCell key={column.key}>
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
            }  
        </>    
    );
  };
  
  export default BuysTable;


