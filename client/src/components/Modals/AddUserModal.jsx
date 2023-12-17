import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { PlusIcon } from '../icons/PlusIcon';

const inputStyles = {
    common: 'w-72 text-sm mt-6 rounded-lg border border-none focus:outline-none focus:ring-0',
  };


const AddUserModal = ({updateList}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure("");
    const [userName, setUserName] = useState("")
    const [userRol, setUserRol] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [missedData, setMissedData] = useState(false)
    const [succesMessage, setSuccesMessage] = useState(false)
    const [textError, setTextError] = useState(false)

    const addNewUser = () => { 
        if(userName.length === 0 || userRol.length === 0 || userEmail.length === 0 || userPassword.length === 0) { 
            setMissedData(true)
            setTextError("Los campos estan incompletos")
            setTimeout(() => { 
                setMissedData(false)
                setTextError("")
            }, 2500)
        } else { 
          const userData = ({ 
            userName: userName, 
            userEmail: userEmail,
            userRol: userRol,
            userPassword: userPassword
           }) 
            axios.post("http://localhost:3000/usuario", userData)
                 .then((res) => { 
                  console.log(res.data)
                  setSuccesMessage(true)
                  setTimeout(() => { 
                    setUserEmail("")
                    setUserName("")
                    setUserPassword("")
                    setUserRol("")
                    setSuccesMessage(false)
                    onClose()
                    updateList()
                  }, 2000)              
               })
                .catch((err) => { 
                 console.log(err)
              })
          }
       }

  return (
    <>
    <Button onClick={onOpen} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR USUARIO </Button>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-white text-black">
       <ModalContent>
         {(onClose) => (
           <>
            <ModalHeader className="flex flex-col items-start justify-start text-center font-bold gap-1" style={{color:"#5C77A9"}}>Añadir Usuario</ModalHeader> 
            <div className='border border-gray-200'></div>
             <ModalBody>
               <div className='flex flex-col text-center items-center justify-center'>
                  <div className='flex flex-col mt-6 items-center justify-center'>
                     <input placeholder='Nombre Completo' className={inputStyles.common} value={userName} style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setUserName(e.target.value)}/>
                     <input placeholder='Rol del Usuario' className={inputStyles.common} value={userRol} style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setUserRol(e.target.value)}/>
                     <input placeholder='Email' className={inputStyles.common} value={userEmail} style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setUserEmail(e.target.value)}/>
                     <input placeholder='Contraseña' className={inputStyles.common} value={userPassword} style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setUserPassword(e.target.value)}/>
                  </div>     
               {missedData ? 
                 <p className='font-bold text-sm mt-6' style={{color:"#728EC3"}}>{textError}</p>  
                 : succesMessage ?
                  <p className='font-bold text-sm mt-6' style={{color:"#728EC3"}}>Usuario añadido Correctamente</p> 
                  :
                 <div className='flex justify-end w-full mt-6'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addNewUser()}>Añadir Nuevo Usuario </Button>
                   </div>}
                 </div>
             </ModalBody>
           </>
         )}
       </ModalContent>
     </Modal>
   </>
  )
}

export default AddUserModal
