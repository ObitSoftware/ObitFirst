import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import alertLogo from "../../img/alertLogo.png"
import axios from "axios"; 
import deleteIcon from "../../img/deleteIcon.png"

export default function DeleteProductModal ({type, producto, showProvidersUpdated, showSaleUpdated,  updateBuyList,  showProductsUpdated, updateBuysList, showClientsUpdated, showUsersUpdated, showEmailsUpdated})  {

  const {isOpen, onOpen, onOpenChange} = useDisclosure("");
  const [productId, setProductId] = useState("")
  const [clientId, setClientId] = useState("")
  const [userId, setUserId] = useState("")
  const [succesMessage, setSuccesMessage] = useState(false)
  const [proveedorId, setProveedorId] = useState("")
  const [compraId, setCompraId] = useState("")
  const [ventaId, setVentaId] = useState("")
  const [salesQuestionSell, setSalesQuestionSell] = useState(false)
  const [salesQuestionBuy, setSalesQuestionBuy] = useState(false)
  const [replenishStockSell, setReplenishStockSell] = useState("")
  const [emailId, setEmailId] = useState("")

  const deleteProduct = () => { 
    axios.delete(`http://localhost:3000/productos/${productId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showProductsUpdated()
          }, 1500)
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteClient = () => { 
    axios.delete(`http://localhost:3000/clientes/${clientId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showClientsUpdated()
          }, 1500)
         })
         .catch((err) => { 
          console.log(err)
         })
  }
  
  const deleteProvider = () => { 
    axios.delete(`http://localhost:3000/proveedores/${proveedorId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showProvidersUpdated()
          }, 1500)
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteSell = () => { 
    axios.delete(`http://localhost:3000/venta/${ventaId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showSaleUpdated()
          }, 1500)
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteSellAndReplenishStock = () => { 
    axios.delete(`http://localhost:3000/venta/reponerStock/${ventaId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
            showSaleUpdated()
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteBuy = () => { 
    axios.delete(`http://localhost:3000/compras/${compraId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            updateBuysList()
          }, 1800)       
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteBuyAndReplenishStock = () => { 
    axios.delete(`http://localhost:3000/compras/reponerStock/${compraId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            updateBuysList()
          }, 1800)       
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const deleteUser = () => { 
    axios.delete(`http://localhost:3000/usuario/${userId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showUsersUpdated()
          }, 1800)       
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  
  const deleteEmail = () => { 
    axios.delete(`http://localhost:3000/email/${emailId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => { 
            showEmailsUpdated()
          }, 1800)       
         })
         .catch((err) => { 
          console.log(err)
         })
  }



  useEffect(() => { 
    if(type === "productos") { 
      setProductId(producto.productId)
    } else if (type === "proveedores") { 
      setProveedorId(producto.proveedorId)
    } else if(type === "venta") { 
      setVentaId(producto.ventaId)
    } else if(type === "compras") { 
      setCompraId(producto.id)
    } else if (type === "clientes") { 
      setClientId(producto.productId)
    } else if (type === "users") { 
      setUserId(producto.userId)
    } else if (type === "email") { 
      setEmailId(producto.id)
    }
    
  }, [producto])


  


  return (
    <>
      {type === "email" ?
          <small onClick={onOpen} className="text-center text-background font-bold cursor-pointer" style={{color:"#1C64F2"}}>Eliminar</small> 
      :
          <small onClick={onOpen} className="text-center text-background font-bold cursor-pointer" style={{color:"#60BCFF"}}>Eliminar</small> 
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <>
             {type === "productos" ?  <ModalHeader className="flex flex-col items-center justify-center text-center gap-1">Eliminar Producto</ModalHeader> : null}
              <ModalBody>
                <div className='flex flex-col text-center items-center justify-center'>
                  <img src={alertLogo} className='w-12 h-12'/>
                  {type === "productos" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar el producto?</small> : null}
                  {type === "clientes" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar el cliente?</small> : null}
                  {type === "proveedores" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar el proveedor?</small> : null}
                  {type === "venta" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar esta venta? </small> : null}
                  {type === "compras" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar esta Compra?</small> : null}
                  {type === "users" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar este Usuario?</small> : null}
                  {type === "email" ?  <small className='text-lg mt-3'>¿Está seguro de eliminar el correo Electronico?</small> : null}
                  <div className='flex items-center justify-center mt-6 gap-6'>

                      {type === "productos" || type === "proveedores" || type === "clientes" || type === "users"  || type === "email"? 
                       <div className="flex gap-6 items-center justify-center">
                          <button className='h-10 w-42 rounded-lg font-bold text-white items-center text-center flex border border-none' style={{backgroundColor:"#728EC3"}}  
                         onClick={() => 
                             {type === "productos" ? deleteProduct() :
                              type === "proveedores" ? deleteProvider() : 
                              type === "clientes" ? deleteClient() :
                              type === "users" ? deleteUser() :
                              type === "email" ? deleteEmail() : 
                              null}}>                           
                            Si, estoy seguro
                        </button>
                        <button className='h-10 w-36 rounded-lg bg-white flex text-center border justify-center' style={{color:"#728EC3", borderColor:"#728EC3"}} onClick={onClose}>No, cancelar</button> 
                       </div>
                     : null }

                 
                    {type === "venta" ?
                     <>
                      <button className='h-10 w-42 rounded-lg font-bold text-white items-center text-center flex border border-none'style={{backgroundColor:"#728EC3"}} onClick={() => setSalesQuestionSell(true)}>                              
                          Si, estoy seguro
                       </button>
                      <button className='h-10 w-36 rounded-lg bg-white flex text-center border justify-center' style={{color:"#728EC3", borderColor:"#728EC3"}} onClick={onClose}>No, cancelar</button> 
                     </>
                      : null}

                   {type === "compras" ?
                     <>
                      <button className='h-10 w-42 rounded-lg font-bold text-white items-center text-center flex border border-none'style={{backgroundColor:"#728EC3"}} onClick={() => setSalesQuestionBuy(true)}>                              
                          Si, estoy seguro
                       </button>
                      <button className='h-10 w-36 rounded-lg bg-white flex items-center text-center border justify-center' style={{color:"#728EC3", borderColor:"#728EC3"}} onClick={onClose}>No, cancelar</button> 
                     </>
                      : null}

                      

                  </div> 

                  {salesQuestionSell ? 
                       <div className="flex items-center justify-center gap-6 mt-8">
                         <p style={{color:"#728EC3"}} className="font-bold text-xs cursor-pointer" onClick={() => deleteSellAndReplenishStock()}>Reponer al Stock</p>
                         <p style={{color:"#728EC3"}} className="font-bold text-xs cursor-pointer" onClick={() =>  deleteSell()()}>No reponer al Stock</p>
                       </div>
                      : null }

                  {salesQuestionBuy ? 
                       <div className="flex items-center justify-center gap-6 mt-8">
                         <p style={{color:"#728EC3"}} className="font-bold text-xs cursor-pointer" onClick={() => deleteBuyAndReplenishStock()}>Reponer al Stock</p>
                         <p style={{color:"#728EC3"}} className="font-bold text-xs cursor-pointer" onClick={() => deleteBuy()}>No reponer al Stock</p>
                       </div>
                      : null }


                 {succesMessage ? 
                   <div className="flex flex-col items-center text-center justify-center mt-6">
                        <p style={{color:"#728EC3"}} className="text-xs 2xl:text-sm font-bold">Eliminado correctamente</p>
                    </div> 
                  : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
