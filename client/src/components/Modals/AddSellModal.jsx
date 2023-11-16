
import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddSellModal = ({}) => {

    const [productsAvailable, setProductsAvailable] = useState([])
    const [productChoosen, setProductChoosen] = useState("")


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
        axios.get(`http://localhost:3000/productos/${productChoosen}`)
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
                           <small>Producto</small>
                           <select className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" style={{backgroundColor:"#E6EEFF"}} display="flex"  onChange={(e) => setProductChoosen(e.target.value)}>
                            {productsAvailable.map((p) => (
                              <option key={p._id}>{p.nombre}</option>
                            ))}
                          </select>
                        </div>   
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
