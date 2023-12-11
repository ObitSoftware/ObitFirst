import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios"
import edit from "../../img/edit.png"

export default function EditModal({type, producto, showUsersUpdated, showProviderEdited, showSaleEditedNow, showClientsUpdated}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [succesMessaggeProductEdited, setSuccesMessaggeProductEdited] = useState(true)

  const [productId, setProductId] = useState("")
  const [providerUniqueId, setProviderUniqueId] = useState("")
  const [ventaId, setVentaId] = useState("")
  const [clientId, setClientId] = useState("")
  const [buyId, setBuyId] = useState("")
  const [newProductName, setNewProductName] = useState(type === "productos" ? producto.nombre : "")
  const [newProductDescription, setNewProductDescription] = useState(type === "productos" ? producto.descripcion : "")
  const [newPrice, setNewPrice] = useState(type === "productos" ? producto.precio : "")
  const [newProductCantidad, setNewProductCantidad] = useState(type === "productos" ? producto.cantidad : "")
  const [newProductCategoria, setNewProductCategoria] = useState(type === "productos" ? producto.categoria : "")
  const [newProductPriceBuy, setNewProductPriceBuy] = useState(type === "productos" ? producto.productPriceBuy : "")
  const [newProviderName, setNewProviderName] = useState(type === "proveedores" ? producto.nombre : "")
  const [newProviderPhone, setNewProviderPhone] = useState(type === "proveedores" ? producto.telefono : "")
  const [sellNewProductName, setSellNewProductName] = useState(type === "venta" ? producto.nombreProducto : "")
  const [sellNewClientName, setSellNewClientName] =useState(type === "venta" ? producto.nombreCliente : "")
  const [sellNewPrice, setSellNewPrice] =useState(type === "venta" ? producto.precio : "")
  const [sellNewQuantity, setSellNewQuantity] =useState(type === "venta" ? producto.cantidad : "")
  const [sellNewTotal, setSellNewTotal] =useState(type === "venta" ? producto.total : "")

  const [clientNewName, setClientNewName] = useState(type === "clientes" ? producto.nombre : "")
  const [clientNewEmail, setClientNewEmail] = useState(type === "clientes" ? producto.email : "")
  const [clientNewDni, setClientNewDni] = useState(type === "clientes" ? producto.dni : "")
  const [clientNewTelephone, setClientNewTelephone] = useState(type === "clientes" ? producto.telefono : "")

 
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
      productPriceBuy: newProductPriceBuy,
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

  const editClient = () => { 
    const newDataForClient = ({ 
      nombre: clientNewName,
      telefono: clientNewTelephone,
      dni: clientNewDni,
      email: clientNewEmail,
    })
    axios.put(`http://localhost:3000/clientes/${clientId}`, newDataForClient)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessaggeProductEdited(false)
          setTimeout(() => {
            showClientsUpdated();
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
    } else if (type === "clientes") { 
      setClientId(producto.productId)
    }
    
  }, [producto])

  
  useEffect(() => { 
    console.log(producto)
  }, [producto])
 

  return (
    <>
      <small onClick={onOpen} className=" text-background font-bold cursor-pointer" style={{color:"#60BCFF"}}>Editar</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <> 
            <div className="flex items-start justify-start border border-b-gray-200">
              {type === "productos" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Producto</ModalHeader> : null}
              {type === "proveedores" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Proveedor</ModalHeader> : null}
              {type === "venta" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Venta</ModalHeader> : null}
              {type === "clientes" ? <ModalHeader className="flex flex-col items-center justify-center gap-1" style={{color:"#5C77A9"}}>Editar Cliente</ModalHeader> : null}
            </div>    
             
              <ModalBody>
                    {type === "productos" ?    
                          <div className="flex flex-col ">

                                 <div className="flex gap-6 items-center">
                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Nombre:</p>
                                      <input type="text" 
                                       className=" w-36 rounded-lg text-xs h-8  border border-none focus:outline-none  focus:ring-0  flex text-center items-center" 
                                       style={{backgroundColor:"#E6EEFF"}}  
                                       value={newProductName} 
                                       onChange={(e) => setNewProductName(e.target.value)} />
                                    </div>

                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Cantidad:</p>
                                      <input type="number" 
                                      className="w-16 rounded-lg text-xs h-8 border border-none focus:outline-none  focus:ring-0  flex text-center items-center"  
                                      style={{backgroundColor:"#E6EEFF"}} 
                                      value={newProductCantidad} 
                                      onChange={(e) => setNewProductCantidad(e.target.value)}/>
                                    </div>
                                 </div>

                                 <div className="flex gap-20 justify-start items-center text-center mt-6">
                                    <div className="flex gap-2 items-center">
                                      <p className="text-xs font-bold">Precio:</p>
                                      <input type="number" 
                                      className="w-24 rounded-lg border border-none focus:outline-none  focus:ring-0  text-xs h-8   flex text-center items-center"  
                                      style={{backgroundColor:"#E6EEFF"}} 
                                      value={newPrice}
                                      onChange={(e) => setNewPrice(e.target.value)}/>
                                    </div>

                                    <div className="flex gap-2 items-center text-center">
                                 
                                       <p className="text-xs font-bold">Precio de Compra: </p>
                                    <input type="number" 
                                      className="w-20 rounded-lg border border-none focus:outline-none  focus:ring-0  text-xs h-8  flex text-center items-center"  
                                      style={{backgroundColor:"#E6EEFF"}} 
                                      value={newProductPriceBuy} 
                                      onChange={(e) => setNewProductPriceBuy(e.target.value)}/>
                                    </div>
                                 </div>

                                 <div className="flex justify-start items-start mt-8 gap-2">
                                   <p className="text-xs font-bold">Descripcion:</p>
                                   <textarea type="text" 
                                    className="rounded-lg border border-none focus:outline-none  focus:ring-0  text-sm flex text-center items-center w-full" 
                                    style={{backgroundColor:"#E6EEFF"}} 
                                    value={newProductDescription}
                                    onChange={(e) => setNewProductDescription(e.target.value)}></textarea>
                                 </div>

                                 <div className="flex justify-start items-start mt-8 gap-2">
                                     <p className="text-xs font-bold">Categoria:</p>
                                      <input type="number" 
                                      className="w-16 rounded-lg border border-none focus:outline-none  focus:ring-0  text-xs h-8  flex text-center items-center"  
                                      style={{backgroundColor:"#E6EEFF"}} 
                                      value={newProductCategoria} 
                                      onChange={(e) => setNewProductCategoria(e.target.value)}/>
                                 </div>

                          </div> 

                          
                     : null }

                     {type === "clientes" ?    
                          <div className="flex flex-col  items-start justify-start mt-6"> 

                          <div className="flex flex-col">
                             <div className="flex items-center text-center justify-evenly">
                                    <p className="font-bold text-sm w-20">Nombre: </p>
                                    <input 
                                    type="text" 
                                    className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none" 
                                    style={{backgroundColor:"#E6EEFF"}}
                                    value={clientNewName}
                                    onChange={(e) => setClientNewName(e.target.value)}/>
                                  </div>

                                  <div className="flex items-center text-center justify-evenly mt-4">
                                    <p className="font-bold text-sm w-20">Telefono: </p>
                                    <input 
                                    type="text" 
                                    className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none"
                                    style={{backgroundColor:"#E6EEFF"}}
                                    value={clientNewTelephone}
                                    onChange={(e) => setClientNewTelephone(e.target.value)}/>      
                                  </div>

                                  <div className="flex items-center text-center justify-evenly mt-4">
                                    <p className="font-bold text-sm w-20">Email: </p>
                                    <input 
                                    type="text" 
                                    className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none"
                                    style={{backgroundColor:"#E6EEFF"}}
                                    value={clientNewEmail}
                                    onChange={(e) => setClientNewEmail(e.target.value)}/>      
                                  </div>

                                  <div className="flex items-center text-center justify-evenly mt-4">
                                    <p className="font-bold text-sm w-20">DNI: </p>
                                    <input 
                                    type="text" 
                                    className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none"
                                    style={{backgroundColor:"#E6EEFF"}}
                                    value={clientNewDni}
                                    onChange={(e) => setClientNewDni(e.target.value)}/>      
                                  </div>
                              </div>                           
                          </div> 
                     : null }

                     {type === "proveedores" ?    
                          <div className="flex flex-col items-start justify-start text-center mt-6">

                            <div className="flex gap-2 text-center items-center justify-center">
                              <p className="font-bold text-sm">Nombre del Proveedor: </p>
                              <input 
                               type="text" 
                               className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none" 
                               style={{backgroundColor:"#E6EEFF"}}
                               value={newProviderName}
                               onChange={(e) => setNewProviderName(e.target.value)}/>
                            </div>

                            <div className="flex gap-2 text-center items-center justify-center mt-6">
                              <p className="font-bold text-sm">Telefono del Proveedor: </p>
                              <input 
                               type="text" 
                               className=" w-44  rounded-lg focus:outline-none  focus:ring-0  text-xs h-8 flex text-center items-center border border-none"
                               style={{backgroundColor:"#E6EEFF"}}
                               value={newProviderPhone}
                               onChange={(e) => setNewProviderPhone(e.target.value)}/>      
                            </div>
                           
                                 
                                   
                          </div> 
                     : null }

                      {type === "venta" ?  

                      <> 

                      <div className="flex flex-col  items-start justify-start mt-6">
                         <div className="flex flex-col"> 

                            <div className="flex items-center text-center justify-evenly">
                               <p className="font-bold text-sm  w-20">Producto: </p>
                               <input 
                               type="text" 
                               className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center" 
                               style={{backgroundColor:"#E6EEFF"}}
                               value={sellNewProductName}
                               onChange={(e) => setSellNewProductName(e.target.value)}/>
                            </div>  

                            <div className="flex items-center text-center justify-evenly mt-2">
                              <p className="font-bold text-sm  w-20">Cliente:  </p>
                              <input type="text" 
                               className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center" 
                               style={{backgroundColor:"#E6EEFF"}}
                               value={sellNewClientName}
                               onChange={(e) => setSellNewClientName(e.target.value)}/>
                            </div>   

                            <div className="flex items-center text-center justify-evenly mt-2">
                              <p className="font-bold text-sm  w-20">Precio:  </p>
                              <input 
                               type="text" 
                               className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center" 
                               style={{backgroundColor:"#E6EEFF"}}
                               value={sellNewPrice}
                               onChange={(e) => setSellNewPrice(e.target.value)}/>
                            </div>  

                            <div className="flex items-center text-center justify-evenly mt-2">
                              <p className="font-bold text-sm  w-20">Cantidad:  </p>
                              <input 
                               type="text" 
                               className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center" 
                               style={{backgroundColor:"#E6EEFF"}}
                               value={sellNewQuantity}
                               onChange={(e) => setSellNewQuantity(e.target.value)}/>
                            </div>

                            <div className="flex items-center text-center justify-evenly mt-2">
                              <p className="font-bold text-sm  w-20">Total:  </p>
                              <input 
                               type="text" 
                               className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center"
                               style={{backgroundColor:"#E6EEFF"}}
                               value={sellNewTotal}
                               onChange={(e) => setSellNewTotal(e.target.value)}/>
                            </div> 

                            <div className="flex items-center text-center justify-evenly mt-2">
                              <p className="font-bold text-sm  w-20">Fecha:  </p>
                              <input type="text" className="w-44 border border-none focus:outline-none  focus:ring-0  rounded-lg text-xs h-8 flex text-center items-center" style={{backgroundColor:"#E6EEFF"}}
                              value={fechaActual} />
                            </div> 

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
                             type === "productos" ? editProduct() : type === "proveedores" ? editProvider() : type === "venta" ? editSell() :  type === "clientes" ? editClient() : null;
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

