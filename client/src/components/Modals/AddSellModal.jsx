
import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddSellModal = ({}) => {

    const [productsAvailable, setProductsAvailable] = useState([])
    const [productId, setProductId] = useState("")
    const [productSelectedData, setProductSelectedData] = useState([])
    const [showProductData, setShowProductData] = useState(false)
    const [quantity, setQuantity] = useState(null)
    const [totalToPay, setTotalToPay] = useState(null)
    const [clientName, setClientName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    
    const actualDate = obtenerFechaActual()

    useEffect(() => { 
            axios.get("http://localhost:3000/productos")
                 .then((res) => { 
                  console.log(res.data)
                  setProductsAvailable(res.data)
                 })
                 .catch((err) => { 
                  console.log(err)
               })
    }, [])

    const getProductId = () => { 
        axios.get(`http://localhost:3000/productos/${productId}`)
             .then((res) => { 
              console.log(res.data)
              setProductSelectedData(res.data)
             })
             .catch((err) => { 
              console.log(err)
             })
    }

    useEffect(() => {
        if (productId !== "") {
          getProductId();
          setTimeout(() => { 
            setShowProductData(true)
          }, 1000)
        }
      }, [productId]);


      const addNewSell = () => { 
        const dataOfSell = ({ 
          idProducto: productSelectedData._id,
          nombreProducto: productSelectedData.nombre,
          nombreCliente: clientName,
          precio: productSelectedData.precio,
          cantidad: quantity,
          total: quantity * productSelectedData.precio,
          fechaCreacion: actualDate
        })
        axios.post("http://localhost:3000/venta", dataOfSell)
             .then((res) => { 
              console.log(res.data)
              setSuccesMessage(true)
              setTimeout(() => { 
                window.location.reload()
              }, 2500)
             })
             .catch((err) => { 
              console.log(err)
             })
      }

<style>
  {`
    .custom-select option:hover {
      background-color: #728EC3;
      color: white; 
      cursor: pointer
    }
  `}
</style>



  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR VENTA </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setProductId(null)}>✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nueva Venta</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>

                    <div className='flex flex-col  mt-6'>
                        <div className='flex items-center gap-8 '> 
                          <div className='flex gap-2 items-center'>
                            <small className='font-bold text-sm'>Producto</small>
                                <select 
                                  className="h-9 rounded-lg border border-none w-48 text-sm text-center justify-center cursor-pointer" 
                                  style={{backgroundColor:"#E6EEFF"}}
                                    display="flex" 
                                    onChange={(e) => {
                                    const selectedName = e.target.value;                            
                                    const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id;
                                    setProductId(selectedId);
                                    }}
                                  >
                                    <option disabled selected> Seleccionar Producto</option>
                                  {productsAvailable.map((p) => (
                                      <>  
                                        <option className="custom-option cursor-pointer" key={p._id}>{p.nombre}</option>
                                      </>
                                  ))}
                                </select>
                          </div>

                          <div className='flex gap-2 text-center items-center'>
                              <p className='font-bold text-sm'>Cantidad</p>
                              <input type="number" className='w-16 h-9 rounded-md'  onChange={(e) => setQuantity(e.target.value)}/>
                          </div>
                        </div>  

                        <div className='flex justify-start items-center text-center mt-4 gap-4'>
                          <p className='font-bold text-sm'>Nombre del Cliente</p>
                          <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' 
                                        style={{backgroundColor:"#E6EEFF"}} 
                                        onChange={(e) => setClientName(e.target.value)}
                          />  
                        </div>
                        {showProductData ? (
                          
                          <div className='flex justify-between '>
                              <div key={productSelectedData._id} className='flex flex-col items-start justify-center mt-6 '>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Stock del producto:</small>
                                     <p className='text-xs'>{productSelectedData.stock}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Proveedor del producto:</small>
                                     <p className='text-xs'>{productSelectedData.proveedor}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Precio por unidad:</small>
                                     <p className='text-xs'>{productSelectedData.precio} $</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Descripcion:</small>
                                     <p className='text-xs'>{productSelectedData.descripcion}</p>
                                  </div>   
                               </div>
                               
                               <div className=''>
                                 <p className='text-sm font-bold mt-20'>Total: {quantity * productSelectedData.precio} $</p>
                               </div>
                          </div> 

                         
                         ) : null}
                   </div>

                   <div className='flex justify-center items-center w-full mt-8'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addNewSell()}>Añadir Venta </Button>
                   </div>

                  {succesMessage ? <div className='flex justify-center items-center w-full mt-8'>
                     <p style={{color:"#728EC3"}} className="font-bold text-md mb-6">Venta asentada con Exito ✔</p>
                   </div> : null}

              
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddSellModal;




/*


import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddSellModal = ({}) => {

    const [productsAvailable, setProductsAvailable] = useState([])
    const [productId, setProductId] = useState("")
    const [productSelectedData, setProductSelectedData] = useState([])
    const [showProductData, setShowProductData] = useState(false)
    const [quantity, setQuantity] = useState(null)
    const [totalToPay, setTotalToPay] = useState(null)
    const [clientName, setClientName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    
    const actualDate = obtenerFechaActual()

    useEffect(() => { 
            axios.get("http://localhost:3000/productos")
                 .then((res) => { 
                  console.log(res.data)
                  setProductsAvailable(res.data)
                 })
                 .catch((err) => { 
                  console.log(err)
               })
    }, [])

    const getProductId = () => { 
        axios.get(`http://localhost:3000/productos/${productId}`)
             .then((res) => { 
              console.log(res.data)
              setProductSelectedData(res.data)
             })
             .catch((err) => { 
              console.log(err)
             })
    }

    useEffect(() => {
        if (productId !== "") {
          getProductId();
          setTimeout(() => { 
            setShowProductData(true)
          }, 1000)
        }
      }, [productId]);


      const addNewSell = () => { 
        const dataOfSell = ({ 
          idProducto: productSelectedData._id,
          nombreProducto: productSelectedData.nombre,
          nombreCliente: clientName,
          precio: productSelectedData.precio,
          cantidad: quantity,
          total: quantity * productSelectedData.precio,
          fechaCreacion: actualDate
        })
        axios.post("http://localhost:3000/venta", dataOfSell)
             .then((res) => { 
              console.log(res.data)
              setSuccesMessage(true)
              setTimeout(() => { 
                window.location.reload()
              }, 2500)
             })
             .catch((err) => { 
              console.log(err)
             })
      }





  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR VENTA </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setProductId(null)}>✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nueva Venta</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>

                    <div className='flex flex-col items-center justify-center mt-6'>
                        <div className='flex text-center items-center gap-2'>
                           <small className='font-bold'>Producto</small>
                           <select 
                            className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" 
                            style={{backgroundColor:"#E6EEFF"}}
                              display="flex" 
                              onChange={(e) => {
                              const selectedName = e.target.value;                            
                              const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id;
                              setProductId(selectedId);
                              }}
                             >
                            {productsAvailable.map((p) => (
                                <>
                                   
                                   <option key={p._id}>{p.nombre}</option>
                                </>
                            ))}
                          </select>
                        </div>  
                        {showProductData ? (
                          
                              <div key={productSelectedData._id} className='flex flex-col items-center justify-center'>

                                 <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Stock del producto:</small>
                                     <p>{productSelectedData.stock}</p>
                                  </div>

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Proveedor del producto:</small>
                                     <p>{productSelectedData.proveedor}</p>
                                  </div>

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Precio por unidad:</small>
                                     <p>{productSelectedData.precio}</p>
                                  </div>

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Descripcion:</small>
                                     <p>{productSelectedData.descripcion}</p>
                                  </div>

                               

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Nombre del cliente</small>
                                        <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' 
                                        style={{backgroundColor:"#E6EEFF"}} 
                                        onChange={(e) => setClientName(e.target.value)}/>  
                                  </div> 

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Cantidad</small>
                                     <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setQuantity(e.target.value)}/>  
                                  </div> 

                                  <div className='flex gap-2 mt-4 text-center items-center'>
                                     <small className='font-bold'>Total a pagar:</small>
                                      <p>{quantity * productSelectedData.precio}</p>
                                  </div> 
                                 
                              </div>
                         
                         ) : null}
                   </div>

                   <div className='flex justify-end w-full mt-8'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addNewSell()}>Añadir Venta </Button>
                   </div>

                  {succesMessage ? <div className='flex justify-end w-full mt-8'>
                     <p style={{color:"#60BCFF"}} className="font-bold text-md mb-6">Venta asentada con Exito</p>
                   </div> : null}

              
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddSellModal;


*/