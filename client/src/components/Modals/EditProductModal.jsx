import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../UsersTable/PlusIcon'


const EditProducModal = () => {
  return (
    <div>
      <small onClick={()=>document.getElementById('my_modal_1').showModal()} className="bg-white text-background font-bold cursor-pointer" style={{color:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> Editar </small>
        <dialog id="my_modal_1" className="modal">
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

export default EditProducModal
