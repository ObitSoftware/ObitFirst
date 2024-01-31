import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteProductModal from "../Modals/DeleteProductModal";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import EmailDetail from "../Modals/EmailDetail";
import { formatePrice } from "../../functions/formatPrice";
import {Spinner} from "@nextui-org/react";


export default function HistoricCashMovements() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("5xl") 
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [typeOfMovement, setTypeOfMovement] = useState("ManualEntry")
  const [load, setLoad] = useState(false)
  const userCtx = useContext(UserContext)

  const changeType = (item) => { 
    setTypeOfMovement(item)
    setLoad(true)
    setTimeout(() => { 
      setLoad(false)
    }, 600)
  }

  useEffect(() => { 
    axios.get(`http://localhost:3000/getAvailableCash/${userCtx.userId}`)
         .then((res) => { 
            const historic = res.data.lastMovements
            if (typeOfMovement === "All") { 
              setData(historic);
              console.log("ALL RESPUESTA", historic);
              const propiedades = Object.keys(historic[0]);
            
              const columnLabelsMap = {
                amount: "Monto Total",
                date: 'Fecha',
                type: "Tipo de Movimiento"
              };
                        
              const typeTranslationMap = {
                spent: "Compra a Proveedor",
                ManualEntry: "Entrada Manual",
                ManualSubtraction: "Resta Manual",
                income: "Ingreso de Venta"
                // Agrega más traducciones según sea necesario
              };
            
              const columnObjects = propiedades.map(propiedad => ({
                key: propiedad,
                label: columnLabelsMap[propiedad] || propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                allowsSorting: true,
                contentRenderer: propiedad === "type"
                  ? value => {
                    const translatedValue = typeTranslationMap[value.toLowerCase()];
                    return translatedValue || value;
                  }
                  : undefined
              }));
            
              setColumns(columnObjects);

                } else { 
                  const filteredMovements = historic.filter((his) => his.type === typeOfMovement);
                  setData(filteredMovements);

                  const columnLabelsMap = {
                    amount: "Monto Total",
                    date: 'Fecha',
                    type: "Tipo de Movimiento"
              };

              const propiedades = Object.keys(historic[0]).filter(propiedad => propiedad !== 'type' );
              const columnObjects = propiedades.map(propiedad => ({
                  key: propiedad,
                  label: columnLabelsMap[propiedad] || propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                  allowsSorting: true
                }));     

                {typeOfMovement === "spent" ?                     
                    columnObjects.push({
                      key: 'Ver Detalle',
                      label: 'Ver Detalle',
                      cellRenderer: (cell) => { 
                      const filaActual = cell.row;
                      const date = filaActual.original.date;
                      const amount = filaActual.original.amount;
                      const allDetail = filaActual.original.detail;
                      ;
                      const detail = {
                        date: date,
                        amount: amount,
                        allDetail: allDetail
                      };
                      return (
                        <EmailDetail type={"historicMovementSpent"} data={detail}/>
                      );
                    },
                    }) 
                : null}

                {typeOfMovement === "income" ?                     
                  columnObjects.push({
                    key: 'Ver Detalle',
                    label: 'Ver Detalle',
                    cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const date = filaActual.original.date;
                    const amount = filaActual.original.amount;
                    const allDetail = filaActual.original.detail;
                    ;
                    const detail = {
                      date: date,
                      amount: amount,
                      allDetail: allDetail
                    };
                    return (
                      <EmailDetail type={"historicMovementIncome"} data={detail}/>
                    );
                  },
                  }) 
            : null}
      
               

             setColumns(columnObjects);
            }

           

                   
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
                                    onClick={() => changeType("ManualEntry")}>
                                    Ingresos Manuales
                                  </p>  
                                  <p 
                                    className={typeOfMovement === "ManualSubtraction" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                    onClick={() => changeType("ManualSubtraction")}>
                                    Restas Manuales
                                  </p> 
                                  <p 
                                      className={typeOfMovement === "spent" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => changeType("spent")}>
                                      Gastos
                                  </p>  
                                  <p 
                                      className={typeOfMovement === "income" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => changeType("income")}>
                                      Ingresos de Ventas
                                  </p>  
                                  <p 
                                      className={typeOfMovement === "All" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => changeType("All")}>
                                      Ver Todos
                                  </p>                   
                                </div>                                          
                              </div>                 
                              {load !== true ? 
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
                                         {column.cellRenderer ? (
                                            column.cellRenderer({ row: { original: item } })
                                          ) : (
                                             (column.key === "amount") ? (
                                                formatePrice(item[column.key])
                                            ) : (
                                              item[column.key]
                                            )
                                          )}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                               :
                               <div className="flex items-center justify-center mt-6"> 
                                      <Spinner size="md" />
                               </div> 
                               }
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
