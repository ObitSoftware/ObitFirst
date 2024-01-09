import React, {useState} from "react";
import axios from "axios"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import alertLogo from "../../img/alertLogo.png"
import green from "../../img/green.png"


export default function AddCategory ({type}) {
  const { isOpen, onOpen, onClose } = useDisclosure("");

    const [categoryName, setCategoryName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [textMessageError, setTextMessageError] = useState("")

    const secondPass = () => { 
      if(categoryName.length === 0) { 
        setErrorMessage(true)
        setTextMessageError("Debes completar el nombre")
      } else { 
        setShowConfirmation(true)
    }
  }

    const addNewCategory = () =>  { 
        if(categoryName.length === 0) { 
            setErrorMessage(true)
            setTextMessageError("Debes completar el nombre")
            setTimeout(() => { 
                setErrorMessage(false)
            }, 2500)
        } else { 
            const newCategory = ({ 
                nombreCategoria: categoryName
            })
            axios.post("http://localhost:3000/productos/addCategory", newCategory)
                 .then((res) => { 
                   console.log(res.data)
                   setSuccesMessage(true)
                   setTimeout(() => { 
                    onClose()
                    setCategoryName("")
                    setSuccesMessage(false)
                   }, 2000)
                  })
                .catch((err) => { 
                   console.log(err)
               })
        }
    }
  
    return (
      <>
      {type === "white" ?  <small className="text-black font-medium" onClick={() => onOpen()}>Añadir Categoria</small> : <small className="text-white font-medium" onClick={() => onOpen()}>Añadir Categoria</small>}
        <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black'>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col items-start justify-start text-center gap-1 border border-b-gray-300 h-12" style={{ color: "#728EC3" }}>
            Añadir Categoria
          </ModalHeader>
          {showConfirmation ? 
              <div className="flex flex-col items-center justify-center m-6"> 
                <div className="flex flex-col items-center justify-center">
                 {succesMessage ? null :
                   <>
                    <img src={alertLogo} className="h-10 w-10 object-contain"/>
                    <p className="font-medium text-zinc-500">Estas seguro que deseas agregar esta categoria?</p>   
                   </>
                  }
                </div>
                <div className="flex gap-4 mt-4">
                   {succesMessage ? null 
                   : 
                   <div className="flex gap-4">
                      <button className="text-sm font-medium text-white" style={{backgroundColor:"#728EC3"}} onClick={() => addNewCategory()}>Si, estoy seguro ✔</button>
                      <button className="text-sm font-medium text-white" style={{backgroundColor:"#728EC3"}} onClick={() => setShowConfirmation(false)}>No, cancelar</button>
                   </div>
                   }
                </div>
                {succesMessage ? 
                <div className="flex gap-2 justify-center items-center">
                    <img src={green} className="h-11 w-11"/>
                    <p className="font-medium text-zinc-500">¡ Se ha creado una nueva Categoria !</p>
                </div>
                :
                null
                }
              </div> 
               :  
                <React.Fragment>
                  <ModalBody>
                    <div className="flex items-center gap-4 mt-6"> 
                      <p className="text-sm ">Nombre de la Categoria:</p>
                      <input  type='text'  className='h-8 rounded-lg  border border-none focus:outline-none focus:ring-0 w-40' value={categoryName} style={{backgroundColor:"#E6EEFF"}} 
                      onChange={(e) => setCategoryName(e.target.value)}/>
                    </div>      
                  </ModalBody>
                  {errorMessage ? 
                    <div className="flex items-center justify-center">
                      <p className="font-bold text-sm mt-8 mb-6"  style={{color:"#728EC3"}}>{textMessageError}</p>
                    </div>
                    :
                    <ModalFooter className="flex justify-center items-center">
                      <Button className="text-sm rounded-2xl text-white font-medium" style={{backgroundColor:"#728EC3"}} onClick={() => secondPass()}>Añadir Categoria ✔</Button>
                    </ModalFooter>
                  }
                </React.Fragment>
              }
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  


 