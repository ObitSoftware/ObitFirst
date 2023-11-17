
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

   


 


  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR VENTA </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nuevo Venta</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>

                  <div className='flex flex-col items-center justify-center mt-6'>
                        <div className='flex text-center items-center gap-2'>
                           <small className='font-bold'>Producto</small>
                           <select 
                            className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" 
                            style={{backgroundColor:"#E6EEFF"}} display="flex" 
                              onChange={(e) => {
                              const selectedName = e.target.value;                            
                              const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id;
                              setProductId(selectedId);
                              }}
                             >
                            {productsAvailable.map((p) => (
                              <option key={p._id}>{p.nombre}</option>
                            ))}
                          </select>
                        </div>  
                        {showProductData ? (
                            productSelectedData.map((p) => (
                              <div key={p._id} className='flex flex-col items-center justify-center'>

                                 <div className='flex gap-2'>
                                     <small className='font-bold'>Stock del producto:</small>
                                     <p>{p.stock}</p>
                                  </div>

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Proveedor del producto:</small>
                                     <p>{p.proveedor[0]}</p>
                                  </div>

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Precio por unidad:</small>
                                     <p>{p.precio}</p>
                                  </div>

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Descripcion</small>
                                     <p>{p.descripcion}</p>
                                  </div>

                               

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Nombre del cliente</small>
                                     <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center'/>  
                                  </div> 

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Cantidad</small>
                                     <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center'/>  
                                  </div> 

                                  <div className='flex gap-2'>
                                     <small className='font-bold'>Total a pagar:</small>
                                      <p>1000$</p>
                                  </div> 
                                 
                              </div>
                            ))
                         ) : null}
                   </div>

                   <div className='flex justify-end w-full mt-8'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' >Añadir Venta </Button>
                   </div>

              
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddSellModal;
