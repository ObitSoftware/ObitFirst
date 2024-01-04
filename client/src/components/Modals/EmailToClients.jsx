import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import obtenerFechaActual from "../../functions/actualDate";

export default function EmailToClients() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('3xl')
  const [email, setEmail] = useState("")
  const [selectedEmails, setSelectedEmails] = useState([])
  const [message, setMessage] = useState("") 
  const [noShowSucces, setNoShowSucces] = useState(true)
  const [actualDate, setActualDate] = useState(obtenerFechaActual())
  const [providersEmail, setProvidersEmail] = useState([])
  const [filteredEmails, setFilteredEmails] = useState([])

  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }



  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" key={size} onClick={() => handleOpen(size)}>Email a Clientes</small>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium" style={{color:"#728EC3"}}>Email</ModalHeader>

              <ModalBody>
                 <div className="w-full flex flex-col ">
                      <div className="w-full flex  gap-2">
                        <div className="relative w-full">
                          <input
                                type="text"
                                className="w-full h-7 rounded-lg border border-zinc-200 focus:outline-none focus:ring-0"
                                
                                placeholder="Cliente.."                             
                              />
                             
                        </div>                      
                          <button  
                              className="h-7 w-20 text-xs border-none focus:outline-none  focus:ring-0 text-center items-center text-white"
                              style={{backgroundColor:"#728EC3"}}
                              >
                                Agregar
                          </button>                    
                      </div>
                    
                      <div className="w-full h-full mt-6">
                        <textarea className="w-full h-full rounded-lg border border-zinc-200 focus:outline-none focus:ring-0"></textarea>
                      </div>
                 </div>
                 <div className="flex items-center justify-end mt-4">
                     <button className="text-sm font-bold text-white border border-none focus:outline-none  focus:ring-0" style={{backgroundColor:"#728EC3"}} >Enviar</button>
                 </div>
               
              </ModalBody> 
              
            
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
