import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import obtenerFechaActual from "../../functions/actualDate";

export default function EmailToProvider() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('3xl')
  const [email, setEmail] = useState("")
  const [selectedEmails, setSelectedEmails] = useState([])
  const [message, setMessage] = useState("") 
  const [noShowSucces, setNoShowSucces] = useState(true)
  const [actualDate, setActualDate] = useState(obtenerFechaActual())
  const [providersEmail, setProvidersEmail] = useState([])
  const [filteredEmails, setFilteredEmails] = useState([])

    useEffect(() => { 
      axios.get("http://localhost:3000/proveedores")
            .then((res) => { 
              const emails = res.data.map((p) => p.email)
              setProvidersEmail(emails)
            })
            .catch((err) => { 
              console.log(err)
            })
    }, [])

    useEffect(() => {
      if (email.trim() === '') {
        setFilteredEmails([]);
        return;
      }
      const filtered = providersEmail.filter((em) =>
        em.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredEmails(filtered);
    }, [email, providersEmail]);

    const handleOpen = (size) => {
      setSize(size)
      onOpen();
    }

    const sendMyEmail = () => { 
      const emailData = ({ 
        addressee: selectedEmails,
        message: message,
        type: "Proveedor",
        date: actualDate
      })
      axios.post("http://localhost:3000/email", emailData)
          .then((res) => { 
              console.log(res.data)
              if(res.data.mensaje === 'Correo electrónico enviado y almacenado con éxito') { 
                setNoShowSucces(false)
              }
              setTimeout(() => { 
                onClose()
                setNoShowSucces(true)
              }, 4500)
          })
          .catch((err) => console.log(err))
    }

    const addNewEmail = (newEmail) => {
      if (email !== "") {
        setSelectedEmails((prevEmails) => [...prevEmails, newEmail]); 
        setEmail(""); 
      }
    };


    const handleChange = (e) => {
      setEmail(e);
      if(e.length === 0) { 
        setEmail("")
      }  
    };

    const handleItemClick = (email) => {
      setEmail(email)
      addNewEmail(email)
    };

    useEffect(() => { 
   console.log(selectedEmails)
    }, [selectedEmails])



  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" key={size} onClick={() => handleOpen(size)}>Email a Proveedores</small>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium" style={{color:"#728EC3"}}>Email</ModalHeader>
            {noShowSucces ? 
              <ModalBody>
                 <div className="w-full flex flex-col ">
                      <div className="w-full flex  gap-2">
                        <div className="relative w-full">
                          <input
                                type="text"
                                className="w-full h-7 rounded-lg border border-zinc-200 focus:outline-none focus:ring-0"
                                value={email}
                                placeholder="Proveedor.."
                                onChange={(e) => handleChange(e.target.value)}
                              />
                              {filteredEmails.length > 0 && (
                                  <div className='options-container absolute z-10 bg-white border rounded-lg mt-1 w-46 items-center jusitfy-center' >
                                      <ul className="list-none p-2 mt-1 border border-zinc-200 rounded-md max-h-[100px] overflow-y-auto">
                                        {filteredEmails.map((filteredEmail, index) => (
                                          <li
                                            key={index}
                                            className="cursor-pointer hover:bg-gray-100 p-1"
                                            onClick={() => handleItemClick(filteredEmail)}
                                          >
                                            {filteredEmail}
                                          </li>
                                        ))}
                                      </ul>
                                </div>
                              )}
                        </div>                      
                          <button  
                              className="h-7 w-20 text-xs border-none focus:outline-none  focus:ring-0 text-center items-center text-white"
                              style={{backgroundColor:"#728EC3"}}
                              onClick={() => addNewEmail()}>
                                Agregar
                          </button>                    
                      </div>
                      {selectedEmails.length !== 0 ? 
                        <div className="flex flex-col justify-start ">
                             {selectedEmails.map((s) =>  <p className="text-zinc-600 text-xs mt-2 ml-2">{s}</p>)}
                        </div>
                        :
                        null
                      }
                      <div className="w-full h-full mt-6">
                        <textarea className="w-full h-full rounded-lg border border-zinc-200 focus:outline-none focus:ring-0" onChange={(e) => setMessage(e.target.value)}></textarea>
                      </div>
                 </div>
                 <div className="flex items-center justify-end mt-4">
                     <button className="text-sm font-bold text-white border border-none focus:outline-none  focus:ring-0" style={{backgroundColor:"#728EC3"}} onClick={() => sendMyEmail()}>Enviar</button>
                 </div>
               
              </ModalBody> 
              :
              <div className="flex items-center justify-center m-8">
                <p style={{color:"#728EC3"}} className="text-md font-bold">Correo electronico enviado con exito a: {email}</p>
              </div>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
