
import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddProviderModal = ({updateList}) => {

  const randomId = uuidv4();

  const [succesMessage, setSuccesMessage] = useState(false)
  const [providerName, setProviderName] = useState("")
  const [providerPhone, setProviderPhone] = useState("")
  const [providerId, setProviderId] = useState("")

  const addProvider = () => { 
    const newProvider = ({ 
      proveedorId: providerId,
      nombre: providerName,
      telefono: providerPhone,
    })
    axios.post("http://localhost:3000/proveedores", newProvider)
          .then((res) => {
           console.log(res.data)
           setSuccesMessage(true)
           setProviderId("")
           setProviderName("")
           setProviderPhone("")
           setTimeout(() => { 
            document.getElementById('my_modal_3').close();
            updateList()
            setSuccesMessage(false)
           }, 1500)
           
          })
          .catch((err) => { 
          console.log(err)
          })
  }


  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR PROVEEDOR </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nuevo Proveedor</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>
                <div className='flex flex-col mt-6 items-center justify-center'>
                     <input placeholder='Numero de Identificacion' className='w-72 text-sm mt-6 rounded-lg' value={providerId} style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProviderId(e.target.value)}/>
                     <input placeholder='Nombre' className='w-72 text-sm mt-6 rounded-lg' value={providerName} style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setProviderName(e.target.value)}/>
                     <input placeholder='Telefono' className='w-72 text-sm mt-4 rounded-lg' value={providerPhone} style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setProviderPhone(e.target.value)}/>
                </div>

                   <div className='flex justify-end w-full mt-4'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addProvider()}>Añadir Nuevo Provedor </Button>
                   </div>

                {succesMessage ? 
                    <div className="flex flex-col items-center text-center justify-center mt-6">
                        <p style={{color:"#728EC3"}} className="text-sm font-bold">Proveedor añadido correctamente</p>
                    </div> 
                  : null}
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddProviderModal
