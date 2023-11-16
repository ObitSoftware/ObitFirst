import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios"

export default function EditProducModal({type, producto}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [productId, setProductId] = useState("")
  const [newProductName, setNewProductName] = useState("")
  const [newProductDescription, setNewProductDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newProductCantidad, setNewProductCantidad] = useState("")
  const [newProductCategoria, setNewProductCategoria] = useState("")

  const sendMyEditData = () => { 
    const newDataForProduct = ({ 
      productName: newProductName,
      productDescription: newProductDescription,
      productPrice: newPrice,
      productQuantity: newProductCantidad,
      productCategory: newProductCategoria,
    })
    axios.put(`http://localhost:3000/productos/${productId}`, newDataForProduct)
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }



  useEffect(() => { 
    setProductId(producto.productId)
  }, [producto])
 

  return (
    <>
      <small onClick={onOpen} className="bg-white text-background font-bold cursor-pointer" style={{color:"#60BCFF"}}>Editar</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
            {type === "productos" ? <ModalHeader className="flex flex-col items-center justify-center gap-1">Editar Producto</ModalHeader> : null}
            {type === "proveedores" ? <ModalHeader className="flex flex-col items-center justify-center gap-1">Editar Proveedor</ModalHeader> : null}
              <ModalBody>
                    {type === "productos" ?    
                          <div className="flex flex-col items-center justify-center">
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.nombre}`} onChange={(e) => setNewProductName(e.target.value)} />
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.descripcion}`} onChange={(e) => setNewProductDescription(e.target.value)}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.precio}`} onChange={(e) => setNewPrice(e.target.value)}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.cantidad}`} onChange={(e) => setNewProductCantidad(e.target.value)}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.categoria}`} onChange={(e) => setNewProductCategoria(e.target.value)}/>
                             
                          </div> 
                     : null }

                     {type === "proveedores" ?    
                          <div className="flex flex-col items-center justify-center">
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.proveedorId}`}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.nombre}`}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.telefono}`}/>                              
                          </div> 
                     : null }

                      {type === "venta" ?    
                          <div className="flex flex-col items-center justify-center">
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.nombreProducto}`}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.nombreCliente}`}/>
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.precio}`}/>     
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.cantidad}`}/> 
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.total}`}/> 
                              <input type="text" className="mt-6 w-44 rounded-lg text-xs h-8 flex text-center items-center" placeholder={`${producto.fechaCreacion}`}/>    
                             <p>{producto.id}  </p>                           
                          </div> 
                     : null }


                  <div className="flex flex-col items-center justify-center">
                    <Button className="font-bold" style={{backgroundColor:"#60BCFF", color:"white"}} onClick={() => sendMyEditData()}>Guardar Cambios</Button>
                  </div>

                  <div>
                       {producto.productId}
                       {producto.proveedorIdUnique}
                  </div>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


/*
Original

import React, { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'


const EditProducModal = ({name}) => {

  useEffect(() => { 
    console.log(name)
  }, [name])

  return (
    <div>
      <small onClick={()=>document.getElementById('my_modal_1').showModal()} className="bg-white text-background font-bold cursor-pointer" style={{color:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> Editar </small>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <form method="dialog">
           
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
           {name}
        </div>
        </dialog>
    </div>
  )
}

export default EditProducModal*/



/*
Funciona, pero mal.

const EditProductModal = ({ producto, name }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(name);
  }, [name]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <small
        onClick={handleOpenModal}
        className="bg-white text-background font-bold cursor-pointer"
        style={{ color: "#60BCFF" }}
        endContent={<PlusIcon />}
        size="sm"
      >
        Editar
      </small>

      <dialog id="my_modal_6" className="modal" open={modalVisible}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </form>
          {name}
        </div>
      </dialog>
    </>
  );
};

export default EditProductModal;

*/