import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios"
import edit from "../../img/edit.png"

export default function EditModal({type, producto, showUsersUpdated, showProviderEdited, showSaleEditedNow}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [succesMessaggeProductEdited, setSuccesMessaggeProductEdited] = useState(true)

  const [productId, setProductId] = useState("")
  const [providerUniqueId, setProviderUniqueId] = useState("")
  const [ventaId, setVentaId] = useState("")
  const [buyId, setBuyId] = useState("")
  const [newProductName, setNewProductName] = useState("")
  const [newProductDescription, setNewProductDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newProductCantidad, setNewProductCantidad] = useState("")
  const [newProductCategoria, setNewProductCategoria] = useState("")
  const [newProviderName, setNewProviderName] = useState("")
  const [newProviderPhone, setNewProviderPhone] = useState("")
  const [sellNewProductName, setSellNewProductName] = useState("")
  const [sellNewClientName, setSellNewClientName] = useState("")
  const [sellNewPrice, setSellNewPrice] = useState("")
  const [sellNewQuantity, setSellNewQuantity] = useState("")
  const [sellNewTotal, setSellNewTotal] = useState("")

  function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const año = fecha.getFullYear();
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    return `${diaFormateado}/${mesFormateado}/${año}`;
  }
  
  const fechaActual = obtenerFechaActual();

  const editProduct = () => { 
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
          setSuccesMessaggeProductEdited(false)
          setTimeout(() => {
            showUsersUpdated();
          }, 1500);
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const editProvider = () => { 
   const newDataForProvider = ( { 
    nombre: newProviderName,
    telefono: newProviderPhone
   })
   axios.put(`http://localhost:3000/proveedores/${providerUniqueId}`, newDataForProvider)
        .then((res) => { 
          console.log(res.data)
          setSuccesMessaggeProductEdited(false)
          setTimeout(() => {
            showProviderEdited();
          }, 1500);
        })
        .catch((err) => { 
          console.log(err)
         })
  }

  const editSell = () => { 
    const newDataForSell = ({ 
      nombreProducto: sellNewProductName,
      nombreCliente: sellNewClientName,
      precio: sellNewPrice,
      cantidad: sellNewQuantity,
      total:sellNewTotal,
      fechaCreacion:fechaActual,
    })
    axios.put(`http://localhost:3000/venta/${ventaId}`, newDataForSell)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessaggeProductEdited(false)
          setTimeout(() => {
            showSaleEditedNow();
          }, 1500);
         })
         .catch((err) => { 
          console.log(err)
         })
        
  }

  useEffect(() => { 
    if(type === "productos") { 
      setProductId(producto.productId)
    } else if (type === "proveedores") { 
      setProviderUniqueId(producto.proveedorIdUnique)
    } else if(type === "venta") { 
      setVentaId(producto.id)
    } else if (type === "compras") { 
      setBuyId(producto.id)
    }
    
  }, [producto])

  
  useEffect(() => { 
    console.log(producto)
  }, [producto])
 

  return (
    <>
      <small onClick={onOpen} className=" text-background font-bold cursor-pointer" style={{color:"#60BCFF"}}>Editar</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <> 
            <div className="flex items-start justify-start border border-b-gray-200">
              {type === "productos" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Producto</ModalHeader> : null}
              {type === "proveedores" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Proveedor</ModalHeader> : null}
              {type === "venta" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Venta</ModalHeader> : null}
            </div>    
             
              <ModalBody>
                    {type === "productos" ?    
                          <div className="flex flex-col ">

                                 <div className="flex gap-6 items-center">
                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Nombre:</p>
                                      <input type="text" className=" w-36 rounded-lg text-xs h-8  border border-none flex text-center items-center"  style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.nombre}`} onChange={(e) => setNewProductName(e.target.value)} />
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Cantidad:</p>
                                      <input type="number" className="w-16 rounded-lg text-xs h-8 border border-none  flex text-center items-center"  style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.cantidad}`} onChange={(e) => setNewProductCantidad(e.target.value)}/>
                                    </div>
                                 </div>

                                 <div className="flex gap-20 justify-start items-center text-center mt-6">
                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Precio:</p>
                                      <input type="number" className="w-24 rounded-lg text-xs h-8 border border-none  flex text-center items-center"  style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.precio}`} onChange={(e) => setNewPrice(e.target.value)}/>
                                    </div>

                                    <div className="flex gap-2 items-center text-center">
                                      <p className="text-xs font-bold">Categoria:</p>
                                      <input type="number" className="w-16 rounded-lg text-xs h-8 border border-none  flex text-center items-center"  style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.categoria}`} onChange={(e) => setNewProductCategoria(e.target.value)}/>
                                    </div>
                                 </div>

                                 <div className="flex justify-start items-start mt-8 gap-2">
                                   <p className="text-xs font-bold">Descripcion:</p>
                                   <textarea type="text" className="rounded-lg text-sm flex text-center items-center w-full" style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.descripcion}`} onChange={(e) => setNewProductDescription(e.target.value)}></textarea>
                                 </div>

                          </div> 

                          
                     : null }

                     {type === "proveedores" ?    
                          <div className="flex flex-col items-start justify-start text-center mt-6">

                            <div className="flex gap-2 text-center items-center justify-center">
                              <p className="font-bold text-sm">Nombre del Proveedor: </p>
                              <input type="text" className=" w-44 rounded-lg text-xs h-8 flex text-center items-center border border-none" style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.nombre}`} onChange={(e) => setNewProviderName(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-center mt-6">
                              <p className="font-bold text-sm">Telefono del Proveedor: </p>
                              <input type="text" className=" w-44 rounded-lg text-xs h-8 flex text-center items-center border border-none" style={{backgroundColor:"#E6EEFF"}} placeholder={`${producto.telefono}`} onChange={(e) => setNewProviderPhone(e.target.value)}/>      
                            </div>
                           
                                 
                                   
                          </div> 
                     : null }

                      {type === "venta" ?  
                      <>  
                          <div className="flex flex-col items-start justify-start mt-4">

                            <div className="flex gap-2 text-center items-center justify-start mt-4">                            
                              <p className="font-bold text-sm">Producto: </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`} onChange={(e) => setSellNewProductName(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-start mt-4">
                              <p className="font-bold text-sm">Cliente:  </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`}onChange={(e) => setSellNewClientName(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-start mt-4">
                              <p className="font-bold text-sm">Precio:  </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`}onChange={(e) => setSellNewPrice(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-start mt-4">
                              <p className="font-bold text-sm">Cantidad:  </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`}onChange={(e) => setSellNewQuantity(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-start mt-4">
                              <p className="font-bold text-sm">Total:  </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`}onChange={(e) => setSellNewTotal(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-start mt-4">
                              <p className="font-bold text-sm">Fecha:  </p>
                              <input type="text" className="w-44 rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                               placeholder={`${producto.nombreProducto}`} value={fechaActual} />
                            </div>

                          </div> 

                     
                          </>
                     : null }

                       {type === "compras" ?    
                          <div className="flex flex-col items-center justify-center">
                              <p>El ID de la compra seleccionada es: {buyId}</p>                   
                          </div> 
                       : null }    


                  <div className="flex flex-col items-center justify-center m-4">

                      {succesMessaggeProductEdited  ? 
                           <Button
                           className="font-bold"
                           style={{ backgroundColor: "#728EC3", color: "white" }}
                           onClick={() => {
                             type === "productos" ? editProduct() : type === "proveedores" ? editProvider() : type === "venta" ? editSell() : null;
                             setTimeout(() => {
                               onClose();
                               setSuccesMessaggeProductEdited(true)
                             }, 2500);
                           }}
                         >
                           Guardar Cambios ✔
                         </Button>
                                                  : 
                        <p style={{color:"#728EC3"}} className="font-bold text-sm mt-6 mb-6">Cambio Actualizado con Exito</p>
                      }

                  </div>

              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

