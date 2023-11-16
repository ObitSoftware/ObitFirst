import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';



/* productId, nombre, descripcion, precio, cantidad, stock, fechacreacion, categoria, proveedor  */


const AddProductModal = () => {

  const actualDate = obtenerFechaActual()
  const randomId = uuidv4();

  const [succesMessage, setSuccesMessage] = useState(false)
  const [allProviders, setAllProviders] = useState([])
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [productStock, setProductStock] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productProvider, setProductProvider] = useState("")
 

  useEffect(() => { 
    axios.get("http://localhost:3000/proveedores")
         .then((res) => {
           setAllProviders(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }, [allProviders])

  const addProduct = () => { 
    const newProductToBeAdd = ({ 
      productId: randomId,
      nombre: productName,
      descripcion: productDescription,
      precio: productPrice,
      cantidad: productQuantity,
      stock: productStock,
      fechaCreacion: actualDate,
      categoria: productCategory,
      proveedor: productProvider,
    })
    axios.post("http://localhost:3000/productos", newProductToBeAdd)
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
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm">    AÑADIR PRODUCTO 
      </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nuevo Producto</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>
                <div className='flex flex-col mt-4'>

                   <div className='flex justify-between items-center'>
                       <div className='flex gap-2 items-center'>
                          <small>Nombre</small>
                          <input type='text' className='h-8 rounded-lg border border-none w-44' style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductName(e.target.value)}/>
                       </div>
                       <div className='flex items-center text-center gap-2'>
                          <small>Cantidad</small>
                          <select className="h-9 rounded-lg border border-none w-24 text-sm" style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductQuantity(e.target.value)}>
                              <option disabled selected>1</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                      </select>
                       </div>
                   </div>

                   <div className='flex justify-between items-center mt-4'>
                       <div className='flex gap-2 items-center'>
                          <small>Precio</small>
                          <input type='text' className='h-8 rounded-lg border border-none w-32'  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductPrice(e.target.value)}/>
                       </div>
                       <div className='flex gap-2 items-center'>
                          <small>Categoria</small>
                          <select className="h-9 rounded-lg border border-none w-44 text-center justify-center text-sm"  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductCategory(e.target.value)}>
                            <option disabled selected >Categoria</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                       </div>
                   </div>

                   <div className='flex justify-between gap-2 w-full items-center mt-4'>
                        <div className='flex text-center items-center gap-2'>
                            <small>Fecha de Ingreso</small>
                              <select className="h-9 rounded-lg border border-none w-24 text-sm text-center justify-center" style={{backgroundColor:"#E6EEFF"}}>
                                    <option>{actualDate}</option>
                              </select>
                        </div>
                        <div className='flex text-center items-center gap-2'>
                           <small>Proveedor</small>
                           <select className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" style={{backgroundColor:"#E6EEFF"}} display="flex"  onChange={(e) => setProductProvider(e.target.value)}>
                            {allProviders.map((provider) => (
                              <option key={provider._id}>{provider.nombre}</option>
                            ))}
                          </select>
                        </div>   
                   </div>

                   <div className='mt-4 flex justify-start items-center gap-2'>
                      <small>Stock</small>
                      <input type="number"  className='h-8 rounded-lg border border-none w-32'  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductStock(e.target.value)}/>
                   </div>

                   <div className='flex flex-col  items-start justify-start w-full mt-6'>
                        <small >Descripcion</small>
                        <textarea type="text" className='w-full rounded-lg border border-none mt-2' style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProductDescription(e.target.value)} ></textarea>
                   </div>

                   <div className='flex justify-end w-full mt-4'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addProduct()}>Añadir Nuevo Producto </Button>
                   </div>

                </div>
                {succesMessage ? 
                   <div className="flex flex-col items-center text-center justify-center mt-6">
                        <p style={{color:"#728EC3"}} className="text-sm font-bold">Producto añadido correctamente</p>
                    </div> 
                  : null}
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddProductModal
