import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react';
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

export default function Cash({type}) {

  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const userCtx = useContext(UserContext)


  return (
    <>
      {type === "white" ?  <small className="text-black font-medium" onClick={() => onOpen()}>Ver Caja</small> : <small className="text-white font-medium" onClick={() => onOpen()}>Ver Caja</small>}
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1 border border-b-gray-300 h-12" style={{ color: "#728EC3" }}> Caja</ModalHeader>
              <React.Fragment>
                <ModalBody className="w-72 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-4 mt-6">
                      <p className="font-bold text-black text-md">{userCtx.userCashRegister}</p> 
                  </div>
                </ModalBody>
              </React.Fragment>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}