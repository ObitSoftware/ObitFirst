import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from '@nextui-org/react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { PlusIcon } from '../icons/PlusIcon'



const AddClientModal = ({ type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure("");
 
 


  return (
    <>
      {type === "sideBar" ? 
      <small onClick={onOpen} className=" font-bold cursor-pointer text-black" >
       Crear Cliente
      </small> : 
       <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR CLIENTE </Button>
      }
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1" style={{ color: "#728EC3" }}>
              Crear Cliente
              </ModalHeader>
               
              <ModalBody>
                  <div className='flex flex-col items-center justify-center text-center'>
                  <div className='flex flex-col mt-6 items-center justify-center'>
                     <input placeholder='Numero de Identificacion' className='w-72 text-sm mt-6 rounded-lg'  style={{backgroundColor:"#E6EEFF"}} />
                     <input placeholder='Nombre' className='w-72 text-sm mt-6 rounded-lg'  style={{backgroundColor:"#E6EEFF"}} />
                     <input placeholder='Telefono' className='w-72 text-sm mt-4 rounded-lg'  style={{backgroundColor:"#E6EEFF"}}  />
                </div>

                   <div className='flex justify-end w-full mt-4'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' >Añadir Nuevo Cliente </Button>
                   </div>
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
