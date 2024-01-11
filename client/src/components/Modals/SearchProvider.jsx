import React, {useEffect, useState} from "react";
import axios from "axios"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SearchProvider ({type}) {

  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [names, setNames] = useState([])
  const [providerId, setProviderId] = useState("")
  const [allProviders, setAllProviders] = useState([])
  const [filteredNames, setFilteredNames] = useState("")
  const [showOptions, setShowOptions] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

    useEffect(() => { 
        axios.get("http://localhost:3000/proveedores")
            .then((res) => { 
            const allProviders = res.data
            const nameOfProviders = allProviders.map((prov) => prov.nombre)
            setNames(nameOfProviders)
            setAllProviders(allProviders)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => { 
        setInputValue(e)
    }

    useEffect(() => {
        if (inputValue.trim() === '') {
        setFilteredNames([]);
        return;
        }
        const onlyNames = allProviders.map((cc) => cc.nombre)
        const filtered = onlyNames.filter((em) =>
        em.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredNames(filtered);
    }, [inputValue, names]);

    const handleClick = (e) => { 
      setFilteredNames("")
      setInputValue(e)
      const searchId = allProviders.filter((cc) => cc.nombre === inputValue)
      setProviderId(searchId.map((cc) => cc._id))
    }

    const goTo = () => { 
      navigate(`/providerProfile/${providerId}`)
      onClose()
    }


    return (
      <>
      {type === "white" ?  <small className="text-black font-medium" onClick={() => onOpen()}>Buscar Proveedor</small> : <small className="text-white font-medium" onClick={() => onOpen()}>Buscar Proveedor</small>}
        <Modal isOpen={isOpen} onClose={onClose} className='w-96 bg-white text-black'>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col items-start justify-start text-center gap-1" style={{ color: "#728EC3" }}>
             Buscar Proveedor
          </ModalHeader>
           
                <ModalBody>
                  <div className="flex items-center gap-4"> 
                    <p className="text-sm text-black font-medium">Nombre del Proveedor:</p>
                    <div className="relative w-full">
                        <input 
                            type='text' 
                            className='h-8 w-60 rounded-lg  border border-none focus:outline-none focus:ring-0 ' 
                            value={inputValue}
                            style={{backgroundColor:"#E6EEFF"}} 
                            onChange={(e) => handleChange(e.target.value)}                
                        />
                        {filteredNames.length > 0 && (
                                    <div className='options-container absolute z-10 bg-white  rounded-lg mt-1 w-46 items-center jusitfy-center' >
                                        <ul className="list-none p-2 mt-1 border border-zinc-200 rounded-md max-h-[200px] overflow-y-auto">
                                            {filteredNames.map((item, index) => (
                                               <li key={index} className="cursor-pointer hover:bg-gray-100 p-1" onClick={() => handleClick(item)}> {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                    </div>
                  
                  </div>      
                
                </ModalBody>
              
                
                <ModalFooter className="flex justify-end items-end">
                  {providerId.length === 0 || inputValue.length === 0 ? 
                   <button className="text-sm text-white" disabled style={{backgroundColor:"#728EC3"}} onClick={() => console.log("ashdioask")}>Buscar</button> : 
                   <button className="text-sm text-white" style={{backgroundColor:"#728EC3"}} onClick={() => goTo()}>Buscar</button>
                   }
                </ModalFooter>
          

               
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  


 