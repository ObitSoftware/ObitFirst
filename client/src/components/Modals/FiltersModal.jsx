import React from 'react'
import FilterIcon from "../../img/FilterIcon.png"
import Arrow from "../../img/arrow.png"


const FiltersModal = () => {
  return (
    <div>
            <img  onClick={() => document.getElementById('my_modal_5').showModal()} className="h-6 w-6 cursor-pointer ml-4"src={FilterIcon}/>
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="flex flex-col">
                    <div className="flex justify-start items-start">
                    <small className="font-bold text-lg" style={{ color: "#5C77A9" }}>
                        Seleccionar Filtro
                    </small>
                    </div>
                    <div className="border border-gray-200 mt-2"></div>
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center justify-start mt-4'>
                        <small className='text-lg'>Seleccione Campo</small>
                    </div>
                    <div className='flex flex-col items-center justify-start mt-4'>
                        <div style={{backgroundColor:"#4F8BE6"}} className='flex justify-between items-center w-full rounded-lg h-12 mt-4 cursor-pointer'>
                            <small className='font-bold text-lg ml-4 text-white'>Productos</small>
                            <img className='h-4 w-4 mr-4' src={Arrow}/>
                        </div>

                        <div style={{backgroundColor:"#96ADD9"}} className='flex justify-between items-center w-full rounded-lg h-12 mt-4 cursor-pointer'>
                            <small className='font-bold text-lg ml-4 text-white'>Proveedores</small>
                            <img className='h-4 w-4 mr-4' src={Arrow}/>
                        </div>

                        <div style={{backgroundColor:"#96ADD9"}} className='flex justify-between items-center w-full rounded-lg h-12 mt-4 cursor-pointer'>
                            <small className='font-bold text-lg ml-4 text-white'>Ventas</small>
                            <img className='h-4 w-4 mr-4' src={Arrow}/>
                        </div>
                    </div>

                    <div className='flex items-center text-center justify-center mt-6'>
                       <button className='rounded-lg text-white h-10 w-36' style={{backgroundColor:"#728EC3"}}>Traer Tabla</button>
                    </div>
                </div>



                </div>
            </dialog>
    </div>
  )
}

export default FiltersModal
