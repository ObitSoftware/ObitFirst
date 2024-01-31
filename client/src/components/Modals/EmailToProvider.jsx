import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import obtenerFechaActual from "../../functions/actualDate";
import obtenerHoraExacta from "../../functions/actualHour";
import clip from "../../img/clip.png"
import {Spinner} from "@nextui-org/react";


export default function EmailToProvider() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('3xl')
  const [email, setEmail] = useState("")
  const [selectedEmails, setSelectedEmails] = useState([])
  const [message, setMessage] = useState("") 
  const [title, setTitle] = useState("") 
  const [noShowSucces, setNoShowSucces] = useState(true)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [actualDate, setActualDate] = useState(obtenerFechaActual())
  const [actualHour, setActualHour] = useState(obtenerHoraExacta())
  const [providersEmail, setProvidersEmail] = useState([])
  const [filteredEmails, setFilteredEmails] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)
  const [viewAllEmails, setViewAllEmails] = useState(false)

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

        setNoShowSucces(false)
        setShowSpinner(true)
        const emailData = ({ 
          addressee: selectedEmails,
          message: message,
          type: "Proveedor",
          title: title,
          date: actualDate,
          hour: actualHour,
        })
        axios.post("http://localhost:3000/email", emailData)
          .then((res) => { 
              console.log(res.data)
              if(res.data.mensaje === 'Correo electrónico enviado y almacenado con éxito') { 
                setShowSpinner(false)
              }
              setTimeout(() => { 
                onClose()
                setNoShowSucces(true)
                setSelectedEmails([])
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
    };

    const handleItemClick = (email) => {
      if (!email.includes('@')) {
        setInvalidEmail(true)
        setTimeout(() => { 
          setSelectedEmails([])
          setEmail("")
          setTitle("")
          setMessage("")
          setInvalidEmail(false)
        }, 1500)
       } else if (email.length === 0) { 
        setInvalidEmail(true)
        setTimeout(() => { 
          setSelectedEmails([])
          setEmail("")
          setTitle("")
          setMessage("")
          setInvalidEmail(false)
        }, 1500)
       } else { 
        setEmail(email)
        addNewEmail(email)
       }
    };




  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" key={size} onClick={() => handleOpen(size)}>Email a Proveedores</small>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium" style={{color:"#5C77A9"}}>Escriba un mensaje a su proveedor</ModalHeader>
            {noShowSucces ? 
              <ModalBody>
                 <div className="w-full flex flex-col ">
                      <div className="w-full items-center flex gap-2">
                        <p style={{color:"#4F5562"}} className="font-medium text-sm">Proveedor</p>
                        <div className="relative w-full">
                        <input
                            type="text"
                            className="w-full text-xs h-8 rounded-lg border border-none focus:outline-none focus:ring-0"
                            value={email}
                            style={{ backgroundColor: "#E7E9ED" }}
                            placeholder={
                              selectedEmails.length === 0
                                ? "Seleccione uno o más Proveedores.."
                                : selectedEmails.map((s) => s).join(", ") 
                               }
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
                              onClick={() => handleItemClick(email)}>
                                Agregar
                          </button>                    
                      </div>
                      {selectedEmails.length >= 3 ? 
                        <div className="flex gap-4 justify-start itmems-center"> 
                            <p className="flex items-center text-xs cursor-pointer"  style={{color:"#5C77A9"}} onClick={() => setViewAllEmails(true)}>Ver todos</p>
                            {viewAllEmails ? selectedEmails.map((s) => <p className="text-xs" style={{color:"#4F5562"}}>{s}</p> ) : null}
                        </div>
                        :
                        null
                      }
                      <div className="flex gap-2 mt-6 items-center">
                        <p style={{color:"#4F5562"}} className="font-medium text-sm">Titulo</p>
                        <input type="text" className="w-full h-8 border border-none   text-black rounded-lg focus:outline-none focus:ring-0" style={{backgroundColor:"#E7E9ED"}} onChange={(e) => setTitle(e.target.value)}/>
                      </div>
                      <div className="w-full h-full mt-6 flex flex-col">
                        <div className="flex justify-between">
                          <div className="flex justify-start">
                             <p style={{color:"#4F5562"}} className="font-medium text-sm">Mensaje</p>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <img src={clip} className="h-3 w-3"/>
                             <p style={{color:"#86898E"}} className="font-medium text-sm"> Añadir Archivo</p>
                          </div>                       
                        </div>
                        <textarea className="w-full h-full rounded-lg border border-none focus:outline-none focus:ring-0 mt-2" style={{backgroundColor:"#E7E9ED"}} onChange={(e) => setMessage(e.target.value)}></textarea>
                      </div>
                 </div>
                 <div className="flex items-center justify-center mt-4">
                   {invalidEmail ?
                      <p className="text-sm font-bold"  style={{color:"#728EC3"}}>Debes ingresar correos electronicos Validos</p> :
                      <button className="text-sm font-bold text-white border border-none focus:outline-none  focus:ring-0" style={{backgroundColor:"#728EC3"}} onClick={() => sendMyEmail()}>Enviar Mensaje ✔</button>
                    }
                 </div>
               
              </ModalBody> 
              :
              <div className="flex items-center justify-center m-8">
                {showSpinner ?  <Spinner size="md" /> : <p style={{color:"#728EC3"}} className="text-md font-bold">Correo electronico enviado con exito a: {selectedEmails.map((s) => s).join(", ")}</p>}
              </div>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
