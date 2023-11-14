import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../UsersTable/PlusIcon'


const DeleteProductModal = () => {
  return (
    <div>
      <small onClick={()=>document.getElementById('my_modal_2').showModal()} className="bg-white text-background font-bold" style={{color:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> Eliminar </small>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <form method="dialog">
           
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
        </dialog>
    </div>
  )
}

export default DeleteProductModal
