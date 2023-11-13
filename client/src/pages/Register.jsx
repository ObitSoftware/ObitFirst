import React from 'react'

const Register = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-start justify-start">    
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" style={{color:"#768BAB"}}>NUEVO USUARIO</h2>
        </div>

<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">    
        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Nombre de Usuario </label>      
            </div>
            <div >
                <input id="email"  name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Nombre de Empresa </label>      
            </div>
            <div className="">
                <input id="email"  name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  E-mail </label>      
            </div>
            <div className="">
                <input id="email"  name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Seleccionar Contraseña </label>      
            </div>
            <div className="">
                <input id="email"  name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Repetir Contraseña </label>      
            </div>
            <div className="">
                <input id="email"  name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

      

        <div className='mt-6 flex items-center justify-center'>
           <button  type="submit" className="flex  justify-center rounded-xl px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-48"style={{backgroundColor:"#768BAB"}} > REGISTRARME </button>
        </div>

</div>
</div>
  )
}

export default Register
