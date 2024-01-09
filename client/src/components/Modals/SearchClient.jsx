import React, {useEffect, useState} from "react";
import axios from "axios"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SearchClient ({type}) {

  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [names, setNames] = useState([])
  const [selectedClientId, setSelectedClientId] = useState("")
  const [allClients, setAllClients] = useState([])
  const [filteredNames, setFilteredNames] = useState("")
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

    useEffect(() => { 
        axios.get("http://localhost:3000/clientes")
            .then((res) => { 
            const allClients = res.data
            const nameOfClients = allClients.map((client) => client.nombre)
            setNames(nameOfClients)
            setAllClients(allClients)
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
        const onlyNames = allClients.map((cc) => cc.nombre)
        const filtered = onlyNames.filter((em) =>
        em.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredNames(filtered);
    }, [inputValue, names]);

    const handleClick = (e) => { 
      setFilteredNames("")
      setInputValue(e)
      const searchId = allClients.filter((cc) => cc.nombre === inputValue)
      setSelectedClientId(searchId.map((cc) => cc._id))
    }

    const goTo = () => { 
      navigate(`/profile/${selectedClientId}`)
    }





  
  
    return (
      <>
      {type === "white" ?  <small className="text-black font-medium" onClick={() => onOpen()}>Buscar Cliente</small> : <small className="text-white font-medium" onClick={() => onOpen()}>Buscar Cliente</small>}
        <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black'>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col items-start justify-start text-center gap-1" style={{ color: "#728EC3" }}>
             Buscar Cliente
          </ModalHeader>
           
                <ModalBody>
                  <div className="flex items-center gap-4"> 
                    <p className="text-sm text-black font-medium">Nombre del cliente:</p>
                    <div className="relative w-full">
                        <input 
                            type='text' 
                            className='h-8 rounded-lg  border border-none focus:outline-none focus:ring-0 w-40' 
                            value={inputValue}
                            style={{backgroundColor:"#E6EEFF"}} 
                            onChange={(e) => handleChange(e.target.value)}                
                        />
                        {filteredNames.length > 0 && (
                                    <div className='options-container absolute z-10 bg-white border rounded-lg mt-1 w-46 items-center jusitfy-center' >
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
                  {selectedClientId.length === 0 || inputValue.length === 0 ? 
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
  


 