import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { formatePrice } from "../../functions/formatPrice";

export default function Cash({type}) {

  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [amount, setAmount] = useState("");
  const [availableCash, setAvailableCash] = useState("");
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
      console.log("Debes ingresar un monto")
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
      }
    }
  

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
                <ModalBody className="w-72 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-4 mt-6">
                     <p className="text-sm font-bold text-black">{availableCash}</p> 
                     <input type="number" className="w-44" onChange={(e) => setAmount(e.target.value)}/>
                     <button className="mt-8 rounded-lg border border-none text-white font-bold" style={{backgroundColor:"#728EC3"}} onClick={() => addMyCash()}>Añadir Dinero a la Caja</button>
                  </div>
                </ModalBody>
              </React.Fragment>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}