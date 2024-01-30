import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { formatePrice } from "../../functions/formatPrice";
import obtenerFechaActual from "../../functions/actualDate";

export default function Cash({type}) {

  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [amount, setAmount] = useState("");
  const [addCash, setAddCash] = useState(false);
  const [restCash, setRestCash] = useState(false);
  const [availableCash, setAvailableCash] = useState("");
  const [actualDate, setActualDate] = useState(obtenerFechaActual())
  const [errorMsg, setErrorMsg] = useState(false)
  const userCtx = useContext(UserContext)

  const getMyCash = () => { 
    axios.get(`http://localhost:3000/getAvailableCash/${userCtx.userId}`)
          .then((res) => { 
           setAvailableCash(formatePrice(res.data.amount))
          })
          .catch((err) => { 
          console.log(err)
          })
  }

        const addMyCash = () => {
    if(amount.length === 0) { 
      setErrorMsg(true)
      setTimeout(() => { 
        setErrorMsg(false)
      }, 2000)
    } else { 
      const amountAsNumber = parseFloat(amount);
        if (!isNaN(amountAsNumber)) {
          axios.put(`http://localhost:3000/increaseCash/${userCtx.userId}`, { amount: amountAsNumber })
            .then((res) => {
              console.log(res.data);
              setAmount("")
              setTimeout(() => { 
                onClose()
                getMyCash()
              }, 500)  
            })
            .catch((err) => console.log(err));
         } 
         const movementData = ({
           type: "ManualEntry",
           date: actualDate,
           amount: amountAsNumber
         })
         axios.post(`http://localhost:3000/addNewMovement/${userCtx.userId}`, movementData)
              .then((res) => { 
                console.log(res.data)
              })
              .catch((err) => { 
                console.log(err)
                })
            }
          }

          const restMyCash = () => {
            if (amount.length === 0) {
              setErrorMsg(true);
              setTimeout(() => {
                setErrorMsg(false);
              }, 2000);
            } else {
              const amountAsNumber = parseFloat(amount);         
              if (isNaN(amountAsNumber)) {
                setErrorMsg(true);
                setTimeout(() => {
                  setErrorMsg(false);
                }, 2000);
              } else {
                const movementData = {
                  type: "ManualSubtraction",
                  date: actualDate,
                  amount: amountAsNumber,
                };
          
                axios
                  .put(`http://localhost:3000/deductCash/${userCtx.userId}`, {
                    totalToRest: amountAsNumber,
                  })
                  .then((res) => {
                    console.log(res.data);
                    setAmount("");
                    setTimeout(() => {
                      onClose();
                      getMyCash();
                    }, 500);
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    axios
                      .post(
                        `http://localhost:3000/addNewMovement/${userCtx.userId}`,
                        movementData
                      )
                      .then((res) => {
                        console.log(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
              }
            }
          };
          
  
        useEffect(() => { 
          getMyCash()
        }, [])

  return (
    <>
      {type === "white" ?  <small className="text-black font-medium" onClick={() => onOpen()}>Ver Caja</small> : <small className="text-white font-medium" onClick={() => onOpen()}>Ver Caja</small>}
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1 border border-b-gray-300 h-12" style={{ color: "#728EC3" }}> Caja</ModalHeader>
              <React.Fragment>
                <ModalBody className="w-auto flex flex-col items-center justify-center"> 
                 <div className="flex items-center justify-center mt-4">
                    <p className="text-xl font-bold" style={{color:"#728EC3"}}>{availableCash}</p> 
                 </div>
                  <div className="flex  items-center gap-4 mt-2">        

                   {addCash  || restCash ?
                    null
                      :
                      <div className="flex gap-6">
                          <button className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}} 
                            onClick={() => setAddCash(true)}>
                            Añadir Dinero a la Caja
                          </button>
                          <button  className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}}
                            onClick={() => setRestCash(true)}>
                            Descontar dinero de la Caja
                          </button>
                      </div>
             
                      }
                      
                  </div>
                {addCash ?
                   <div className="flex items-center flex-col justify-center">
                      <input type="number" placeholder="Ingrese el monto" className="w-44 h-8 border border-gray-600 rounded-lg focus:outline-none focus:ring-0 " onChange={(e) => setAmount(e.target.value)}/>

                      {errorMsg ? 
                        <div className="mt-4 flex items-center justify-center">
                          <p className="text-sm font-bold" style={{ color: "#728EC3" }}>Debes ingresar un Monto</p>
                        </div>
                         :
                        <div className="flex items-center gap-4 mt-6">
                            <button className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}} 
                                    onClick={() => addMyCash()}>
                                      Añadir Dinero ✔
                            </button>
                            <button className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}} 
                                    onClick={() => setAddCash(false)}>
                                    Cancelar Operacion
                            </button> 
                        </div>}                    
                   </div> 
                  : null}

                  {restCash ?
                   <div className="flex items-center flex-col justify-center">
                      <input type="number" placeholder="Ingrese el monto" className="w-44 h-8 border border-gray-600 rounded-lg focus:outline-none focus:ring-0 " onChange={(e) => setAmount(e.target.value)}/>

                      {errorMsg ? 
                        <div className="mt-4 flex items-center justify-center">
                          <p className="text-sm font-bold" style={{ color: "#728EC3" }}>Debes ingresar un Monto</p>
                        </div>
                         :
                        <div className="flex items-center gap-4 mt-6">
                            <button className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}} 
                                    onClick={() => restMyCash()}>
                                      Restar Dinero ✔
                            </button>
                            <button className="mt-2 h-8 w-auto text-center items-center text-xs rounded-lg border border-none text-white font-bold focus:outline-none focus:ring-0" style={{backgroundColor:"#728EC3"}} 
                                    onClick={() => setRestCash(false)}>
                                    Cancelar Operacion
                            </button> 
                        </div>}                    
                   </div> 
                  : null} 
                </ModalBody>
              </React.Fragment>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}