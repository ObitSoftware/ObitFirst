import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import alertLogo from "../../img/alertLogo.png"
import axios from "axios";

export default function ViewBuyDetail ({type, producto})  {

  const {isOpen, onOpen, onOpenChange} = useDisclosure("");
  const [productId, setProductId] = useState("")
  const [succesMessage, setSuccesMessage] = useState(false)
 


  return (
    <>
     <small onClick={onOpen} className="bg-white text-background font-bold cursor-pointer" style={{color:"#60BCFF"}}>Ver Detalle</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center text-center gap-1">Detalle de Compra</ModalHeader> 
              <ModalBody>
                <div className='flex flex-col text-center items-center justify-center'>
                  <img src={alertLogo} className='w-12 h-12'/>
                    <div className='flex items-center justify-center mt-6 gap-6'>
                        <button className='h-10 w-36 rounded-lg font-bold text-white text-center flex border border-none' style={{backgroundColor:"#728EC3"}}  >                              
                            Si, estoy seguro
                        </button>
                        <button className='h-10 w-36 rounded-lg bg-white flex text-center border justify-center' style={{color:"#728EC3", borderColor:"#728EC3"}} onClick={onClose}>No, cancelar</button>
                    </div> 
                 {succesMessage ? 
                   <div className="flex flex-col items-center text-center justify-center mt-6">
                        <p style={{color:"#728EC3"}} className="text-sm font-bold">Eliminado correctamente</p>
                    </div> 
                  : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
