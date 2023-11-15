import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import alertLogo from "../../img/alertLogo.png"


const DeleteProductModal = () => {
  return (
    <div>
      <small onClick={()=>document.getElementById('my_modal_2').showModal()} className="bg-white text-background font-bold cursor-pointer" style={{color:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> Eliminar </small>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <form method="dialog">     
               <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
           <div className='flex flex-col items-center justify-center'>
                 <img src={alertLogo} className='w-12 h-12'/>
                 <small className='text-lg mt-3'>¿Está seguro de Lorem Ipsum dolor sit amet consectetur adipiscing?</small>
                 <div className='flex items-center justify-center mt-6 gap-6'>
                    <button className='h-10 w-36 rounded-lg font-bold text-white text-center flex' style={{backgroundColor:"#728EC3"}}>Si, estoy seguro</button>
                    <button className='h-10 w-36 rounded-lg bg-white flex text-center border justify-center' style={{color:"#728EC3", borderColor:"#728EC3"}}>No, cancelar</button>
                 </div> 
           </div>
        </div>
        </dialog>
    </div>
  )
}

export default DeleteProductModal
