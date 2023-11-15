import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'


const AddProductModal = ({text}) => {
  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR {text} </Button>
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
                          <input type='text' className='h-8 rounded-lg border border-none w-44' style={{backgroundColor:"#E6EEFF"}}/>
                       </div>
                       <div className='flex items-center gap-2'>
                          <small>Cantidad</small>
                          <select className="h-9 rounded-lg border border-none w-12 text-sm" style={{backgroundColor:"#E6EEFF"}}>
                              <option disabled selected>1</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                      </select>
                       </div>
                   </div>

                   <div className='flex justify-between items-center mt-4'>
                       <div className='flex gap-2 items-center'>
                          <small>Precio</small>
                          <input type='text' className='h-8 rounded-lg border border-none w-32'  style={{backgroundColor:"#E6EEFF"}}/>
                       </div>
                       <div className='flex gap-2 items-center'>
                          <small>Categoria</small>
                          <select className="h-9 rounded-lg border border-none w-44 text-center justify-center text-sm"  style={{backgroundColor:"#E6EEFF"}}>
                            <option disabled selected >Categoria</option>
                            <option>Svelte</option>
                            <option>Vue</option>
                            <option>React</option>
                        </select>
                       </div>
                   </div>

                   <div className='flex justify-end gap-2 w-full items-center mt-4'>
                      <small>Fecha de Ingreso</small>
                      <select className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" style={{backgroundColor:"#E6EEFF"}}>
                             <option>05/11/2023</option>
                            <option>..</option>
                            <option>..</option>
                      </select>
                   </div>

                   <div className='flex flex-col  items-start justify-start w-full'>
                        <small>Descripcion</small>
                        <textarea type="text" className='w-full rounded-lg border border-none mt-2'  style={{backgroundColor:"#E6EEFF"}}></textarea>
                   </div>

                   <div className='flex justify-end w-full mt-4'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold'>Añadir Nuevo Producto </Button>
                   </div>

                </div>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddProductModal
