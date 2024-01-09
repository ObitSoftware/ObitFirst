import React, {useState} from "react";
import axios from "axios"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';


export default function AddCategory ({type}) {
  const { isOpen, onOpen, onClose } = useDisclosure("");

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
                    console.log("agregado")
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
                <ModalBody>
                  <div className="flex items-center gap-4 mt-6"> 
                    <p className="text-sm ">Nombre de la Categoria:</p>
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
                <ModalFooter className="flex justify-center items-center">
                        <Button className="text-sm rounded-2xl text-white font-medium" style={{backgroundColor:"#728EC3"}} onClick={() => addNewCategory()}>Añadir Categoria ✔</Button>
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
  


 