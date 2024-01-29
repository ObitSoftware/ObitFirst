import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteProductModal from "../Modals/DeleteProductModal";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import EmailDetail from "../Modals/EmailDetail";

export default function HistoricCashMovements() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("5xl") 
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [typeOfMovement, setTypeOfMovement] = useState("ManualEntry")
  const userCtx = useContext(UserContext)

  const showEmailsUpdated = () => {
    axios.get("http://localhost:3000/email")
         .then((res) => {
          const allData = res.data
          setData(allData)
          setTypeOfEmail("Proveedor")
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getHistoric = () => {
      axios.get(`http://localhost:3000/getAvailableCash/${userCtx.userId}`)
         .then((res) => {
         console.log("HISTORICO", res.data.lastMovements)
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => { 
    getHistoric()
  })


  useEffect(() => { 
    axios.get(`http://localhost:3000/getAvailableCash/${userCtx.userId}`)
         .then((res) => { 
            const historic = res.data.lastMovements
            const filteredMovements = historic.filter((his) => his.type === typeOfMovement)
            console.log("AAAAAAAAA", filteredMovements)
            console.log("BBBBB", historic)
            console.log(filteredMovements)
            if(typeOfMovement === "All") { 
                setData(historic)
            }
            setData(filteredMovements)

                  const columnLabelsMap = {
                      amount: "Monto Total",
                      date: 'Fecha',
                    };

                    const propiedades = Object.keys(historic[0]).filter(propiedad => propiedad !== 'type' );
                    const columnObjects = propiedades.map(propiedad => ({
                        key: propiedad,
                        label: columnLabelsMap[propiedad] || propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                        allowsSorting: true
                      }));     

            
                    columnObjects.push({
                    key: 'Ver Detalle',
                    label: 'Ver Detalle',
                    cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const message = filaActual.original.message;
                    const addressee = filaActual.original.addressee
                    ;
                    const producto = {
                    id: id,
                    message: message,
                    addressee: addressee
                    };
                    return (
                      <EmailDetail data={producto}/>
                    );
                  },
                  })    
  
             setColumns(columnObjects);
         })
         .catch((err) => { 
            console.log(err)
         })
  }, [typeOfMovement])

 
  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" onClick={() => handleOpen()}>Ver Movimientos de Caja</small>

      </div>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium  border-b border-gray-300 h-12 ml-8 mr-8">
                  <p className="font-medium text-md 2xl:text-lg" styler={{color:"#4F5562"}}>Historico de Movimientos</p>
              </ModalHeader>         
              <ModalBody>
                  <div>
                  {userCtx.userId && userCtx.userId.length >= 10 ? (
                            <div>   
                              <div className="flex justify-between items-start rounded-t-lg rounded-b-none w-full" >
                                <div className="flex justify-start items-center ml-6 gap-8 border-b border-gray-200 w-full">
                                  <p 
                                    className={typeOfMovement === "ManualEntry" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                    onClick={() => setTypeOfMovement("ManualEntry")}>
                                    Ingresos Manuales
                                  </p>  
                                  <p 
                                      className={typeOfMovement === "Spent" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => setTypeOfMovement("spent")}>
                                      Gastos
                                  </p>  
                                  <p 
                                      className={typeOfMovement === "Income" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => setTypeOfMovement("Income")}>
                                      Ingresos de Ventas
                                  </p>  
                                  <p 
                                      className={typeOfMovement === "All" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => setTypeOfMovement("All")}>
                                      Ver Todos
                                  </p>                   
                                </div>                                          
                              </div>                 
                              <Table aria-label="Example table with dynamic content" className="w-max-w max-h-[400px] 2xl:max-[600px] overflow-y-auto flex items-center text-center justify-center mt-4">
                                <TableHeader columns={columns}>
                                  {(column) => (
                                    <TableColumn key={column.key} className="text-xs text-center items-center justify-center gap-6" style={{color:"#4F5562", backgroundColor:"white"}}>
                                      {column.label}
                                    </TableColumn>
                                  )}
                                </TableHeader>
                                <TableBody items={data}>
                                  {(item) => (
                                    <TableRow key={item.amount}>
                                      {columns.map(column => (
                                        <TableCell align="center" key={column.key} className={`items-center text-center text-black dark:text-black`} style={{ verticalAlign: 'left' }}>
                                          {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table> 
                            </div>
                          ) : null}
                 </div>          
              </ModalBody>
              <ModalFooter>
                <p className="font-medium text-black text-sm ">Cantidad de Movimientos: {data.length}</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
