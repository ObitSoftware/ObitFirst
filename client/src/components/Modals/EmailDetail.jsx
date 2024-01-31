import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function EmailDetail({data, type}) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <small onClick={onOpen} className="font-bold text-xl cursor-pointer" style={{color:"#1C64F2"}}>+</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
        {(onClose) => (
  <>
    {type === "historicMovement" ? (
      <ModalHeader styler={{ color: "#4F5562" }} className="flex flex-col gap-1">
        Detalle del Movimiento
      </ModalHeader>
    ) : (
      <ModalHeader className="flex flex-col gap-1">Detalle del Email</ModalHeader>
    )}

    <ModalBody className="w-auto">
      <>
        {type === "email" ? (
          <div className="flex flex-col items-start justify-start ">
            <div className="flex flex-col ">
                <p className="text-sm font-medium">Destinatarios: </p>
                {data.addressee.map((d) => (
                  <p className="text-xs font-medium text-zinc-500 ml-2 mt-1">{d}</p>
                ))}      
            </div>
            <hr />
            <div className="flex flex-col mt-2 border-t border-t-gray-300 w-full">
              <p className="text-sm font-medium mt-2">Mensaje Enviado: </p>
              <p className="text-sm text-zinc-500 ml-2 mt-1">{data.message}</p>
            </div>
          </div>
        ) : type === "historicMovementSpent" ? (
          <div className="flex flex-col items-center justify-center">
            <p>Fecha: {data.date}</p>
            <p>Total Gastado: {data.amount}</p>
            <div className="flex flex-col items-center justify-center mt-6">
              <p className="font-bold text-zinc-600">Compraste:</p>
              {data.allDetail.productosComprados.map((c) => (
                <div className="flex flex-col items-center justify-center">
                  <p>Producto: {c.nombreProducto}</p>
                  <p>Precio por Unidads: {c.precioPorducto}</p>
                  <p>Unidades: {c.cantidad}</p>
                  <p>Proveedor {c.proveedor[0]}</p>
                  <p>Observaciones: {c.observaciones}</p>
                  <p>Gastaste: {c.total}</p>
                </div>
              ))}
            </div>
          </div>
        ) : type === "historicMovementIncome" ? (
          <div className="flex flex-col items-center justify-center">
            <p>Fecha: {data.date}</p>
            <p>Ingreso de Venta: {data.amount}</p>
          </div>
        ) : null}
      </>
    </ModalBody>
  </>
)}
        </ModalContent>
      </Modal>
    </>
  );
}
