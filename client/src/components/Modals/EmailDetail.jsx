import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function EmailDetail({data}) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <small onClick={onOpen} className="font-bold text-xl cursor-pointer" style={{color:"#1C64F2"}}>+</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Detalle del Email</ModalHeader>
              <ModalBody>                           
                <div className="flex flex-col items-center justify-start m-8">
                    <div className="flex gap-4">
                        <p className="text-sm font-medium">Destinatarios: </p>
                        {data.addressee.map((d) =>  <p className="text-xs font-medium text-zinc-500">{d}</p>)}
                    </div>
                    <div className="flex gap-4">
                      <p  className="text-sm font-medium">Mensaje Enviado</p>
                      <p className="text-sm text-black">{data.message}</p>     
                    </div>              
                </div>
              </ModalBody>            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
