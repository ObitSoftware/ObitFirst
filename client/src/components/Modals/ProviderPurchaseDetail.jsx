import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ProviderPurchaseDetail({detail}) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
       <p onClick={onOpen} className='text-xs font-medium ml-2 underline cursor-pointer'  style={{color:'#728EC3'}}> Ver Detalle</p>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    <p> 
                  {detail.map((p) => ( 
                    <>
                      <p>{p.proveedor}</p>
                      <p>{p.nombreProducto}</p>
                      <p>{p.nombreCliente}</p>
                      <p>{p.total}</p>
                    </>
                  ))}
                    </p>
        
                </ModalBody>
        
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  );
}