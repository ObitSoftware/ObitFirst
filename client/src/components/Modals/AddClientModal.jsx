import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from '@nextui-org/react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { PlusIcon } from '../icons/PlusIcon'
import axios from "axios"
import alertLogo from "../../img/alertLogo.png"
import green from "../../img/green.png"


const AddClientModal = ({ type, colorSelected, updateList, refresh }) => {
  const { isOpen, onOpen, onClose } = useDisclosure("");


  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [dni, setDni] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [succesMessage, setSuccesMessage] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)


  useEffect(() => { 
    axios.get("http://localhost:3000/clientes")
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }, [])

  const createNewUser = () => { 
      const userData = ({ 
        nombre: name,
        telefono: telephone,
        dni: dni,
        email: email,
      })
      axios.post("http://localhost:3000/clientes", userData)
           .then((res) => { 
               console.log(res.data)
               setSuccesMessage(true)
               setTimeout(() => { 
                onClose()
                updateList()
                setDni("")
                setTelephone("")
                setName("")
                setEmail("")
                setSuccesMessage(false)
                refresh()
               }, 2200)
               })
       .catch((err) => { 
       console.log(err)
       })
  }

  const secondPass = () => { 
    const validateEmail = email.includes("@");
    if (name.length <= 3 || telephone.length <= 3 || dni.length <= 5 || email.length <= 5) {
      setError(true)
      setErrorMessage("Los datos estan incompletos")
      setTimeout(() => { 
        setError(false)
        setDni("")
        setTelephone("")
        setName("")
        setEmail("")
      }, 2500)
    } else if (!validateEmail) {
      setError(true);
      setErrorMessage("Ingresa un correo electronico valido");
      setTimeout(() => {
        setError(false);
        setEmail("")
      }, 2500);
  } else { 
    setShowConfirmation(true)
  }
  }
 
 


  return (
    <>
      {type === "sideBar" ? 
      <small onClick={onOpen} className={`font-medium cursor-pointer ${colorSelected === 'white' ? 'text-black' : 'text-white'}`}>
       Crear Cliente
      </small> : 
       type === "table" ? 
       <Button onClick={onOpen} className="bg-foreground text-background font-medium cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR CLIENTE </Button>
      : type === "addingSell" ? 
         <small onClick={onOpen} className="text-xs font-medium underline cursor-pointer" style={{color:"E6EEFF"}}>
            Si el cliente no esta registrado, has click aqui.
        </small> : null
       }
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black dark:bg-white'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1  border border-b-gray-300 h-12 font-medium" style={{ color: "#5C77A9" }}>
                Crear Nuevo Cliente
              </ModalHeader>
               
              <ModalBody className='w-96'>

                  <div className='flex flex-col items-center '>

                    {showConfirmation ? 
                     <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center justify-center'>
                          {succesMessage ? null 
                          :
                          <>
                           <img src={alertLogo} className='w-11 h-11'/>
                           <p className='text-sm text-zinc-500 font-medium mt-4'>¿Estas seguro de agregar al cliente?</p>
                          </>
                          }
                        </div>
                        {succesMessage ? null :
                          <div className="flex gap-4 mt-4">
                            <button className="text-sm font-medium text-white" style={{backgroundColor:"#728EC3"}} onClick={() => createNewUser()}>Si, estoy seguro ✔</button>
                            <button className="text-sm font-medium text-white" style={{backgroundColor:"#728EC3"}} onClick={() => setShowConfirmation(false)}>No, cancelar</button>
                        </div>}
                      </div>
                     :
                       <>                                      
                        <div className='flex flex-col  items-start justify-start'> 
                              <div className='flex gap-4  justify-start  text-sm items-center mt-2'>
                                  <p className='text-sm' style={{color:"#4F5562"}}>Nombre y Apellido</p>
                                  <input  className='w-36 h-8 text-sm mt-2 rounded-lg border border-none' value={name}  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setName(e.target.value)}/>
                              </div>
                              <div className='flex gap-4  justify-start  text-sm items-center mt-4'>
                                  <p className='text-sm' style={{color:"#4F5562"}}>Numero Telefonico</p>
                                  <input className='w-36 h-8 text-sm  rounded-lg border border-none'  value={telephone}  style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setTelephone(e.target.value)}/>
                              </div>
                              <div className='flex gap-4  justify-start  text-sm items-center mt-4'>
                                  <p className='text-sm' style={{color:"#4F5562"}}>DNI</p>
                                  <input  className='w-36 h-8 text-sm  rounded-lg border border-none ml-2'  value={dni}  style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setDni(e.target.value)}/>
                              </div>
                              <div className='flex gap-4  justify-start  text-sm items-center mt-4'>
                                  <p className='text-sm' style={{color:"#4F5562"}}>Email</p>
                                  <input  className='w-36 h-8 text-sm  rounded-lg border border-none'  value={email}  style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setEmail(e.target.value)}/>
                              </div>                    
                        </div>        
                        <div className='flex justify-center w-full m-6'>
                            <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => secondPass()}>Añadir Nuevo Cliente ✔</Button>
                        </div>
                      </>
                    }               

                    {error ? <p className='font-bold text-xs' style={{ color: "#728EC3" }}>{errorMessage}</p> : null}

                    {succesMessage ? 
                         <div className="flex gap-2 justify-center items-center m-4">
                           <img src={green} className="h-11 w-11"/>
                           <p className="font-medium text-zinc-500">¡ Se ha creado un nuevo Cliente !</p>
                        </div> 
                       : 
                      null
                    }

                  </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClientModal;