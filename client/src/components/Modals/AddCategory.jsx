import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios"


export default function AddCategory() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [categoryName, setCategoryName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [textMessageError, setTextMessageError] = useState("")

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
        <small onClick={() => onOpen()}>Añadir Categoria</small>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 items-start justify-start" style={{color:"#728EC3"}}> Añadir Categoria </ModalHeader>
                <ModalBody>
                  <div className="flex items-center gap-4"> 
                    <p className="text-sm text-black font-medium">Nombre de la Categoria:</p>
                    <input 
                        type='text' 
                        className='h-8 rounded-lg  border border-none focus:outline-none focus:ring-0 w-40' 
                        value={categoryName}
                        style={{backgroundColor:"#E6EEFF"}} 
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>      
                </ModalBody>
                {
                errorMessage ? 
                <div className="flex items-center justify-center">
                    <p className="font-bold text-sm mt-8 mb-6"  style={{color:"#728EC3"}}>{textMessageError}</p>
                </div>
                :
                <ModalFooter className="flex justify-end items-end">
                        <Button className="text-sm text-white" style={{backgroundColor:"#728EC3"}} onClick={() => addNewCategory()}>Añadir Categoria</Button>
                    </ModalFooter>
                }

                {succesMessage ? <div className="flex items-center justify-center"><p className="font-bold text-sm m-6" style={{color:"#728EC3"}}>Categoria añadida correctamente</p></div> : null}
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  