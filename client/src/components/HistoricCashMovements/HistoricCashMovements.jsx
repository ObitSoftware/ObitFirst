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
  const [typeOfEmail, setTypeOfEmail] = useState("Proveedor")
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
    axios.get("http://localhost:3000/email")
         .then((res) => { 
            console.log("emailsss:", res.data)
            const emails = res.data
            const filteredEmails = emails.filter((em) => em.type === typeOfEmail)
            console.log(filteredEmails)
            setData(filteredEmails)

                  const columnLabelsMap = {
                      title: "Titulo",
                      date: 'Fecha',
                      hour: "Hora",
                    };

                    const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id'  && propiedad !== 'addressee'  && propiedad !== 'type' && propiedad !== 'message');
                    const columnObjects = propiedades.map(propiedad => ({
                        key: propiedad,
                        label: columnLabelsMap[propiedad] || propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                        allowsSorting: true
                      }));     

                    columnObjects.push({
                      key: 'Destinatario',
                      label: 'Destinatario',
                      cellRenderer: (cell) => { 
                        const filaActual = cell.row;
                        const id = filaActual.original._id;     
                        const addressee = filaActual.original.addressee;           
                        const getEmails = addressee.map((em) => em)
                        const emails = getEmails
                        const producto = {
                          id: id,
                        };
                        console.log(emails);
                        return (
                          <p>
                            {emails.slice(0, 1) + "...."}                      
                          </p>
                        );
                      },
                    })     

                    columnObjects.push({
                    key: 'Abrir',
                    label: 'Abrir',
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
                      <DeleteProductModal  producto={producto} type={"email"} showEmailsUpdated={showEmailsUpdated}/>
                    );
                  },
                  })     

                  columnObjects.sort((a, b) => {
                    if (a.key === 'title') {
                      return -1; 
                    } else if (b.key === 'title') {
                      return 1; 
                    }
                    return 0; 
                  }); 

             setColumns(columnObjects);
         })
         .catch((err) => { 
            console.log(err)
         })
  }, [typeOfEmail])

 
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
                                    className={typeOfEmail === "Proveedor" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                    onClick={() => setTypeOfEmail("Proveedor")}>
                                    Ingresos Manuales
                                  </p>  
                                  <p 
                                      className={typeOfEmail === "Cliente" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => setTypeOfEmail("Cliente")}>
                                      Gastos
                                  </p>  
                                  <p 
                                      className={typeOfEmail === "Cliente" ? "text-sm m-1 font-medium text-blue-600 cursor-pointer" : "text-sm m-1 text-black cursor-pointer"}
                                      onClick={() => setTypeOfEmail("Cliente")}>
                                      Ingresos de Ventas
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
                                    <TableRow key={item._id}>
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
                <p className="font-medium text-black text-sm ">Cantidad de Emails: {data.length}</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
