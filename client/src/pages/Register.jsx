import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"


const Register = () => {

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userRol, setUserRol] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userFirstPassword, setUserFirstPassword] = useState("")
     const [succesMessagge, setSuccesMessage] = useState(true)
    const [passwordIncorrect, setPasswordIncorrect] = useState(true)

    const registerNewUser = () => { 
       const userData = ({ 
        userName: userName, 
        userEmail: userEmail,
        userRol: userRol,
        userPassword: userPassword
       }) 
       if(userFirstPassword === userPassword) { 
        axios.post("http://localhost:4000/usuario", userData)
             .then((res) => { 
                console.log(res.data)
                setSuccesMessage(false)
             })
             .catch((err) => { 
               console.log(err)
            })
        } else { 
            setPasswordIncorrect(false)
            setUserName("")
            setUserEmail("")
            setUserRol("")
            setUserFirstPassword("")
            setUserPassword("")
            setTimeout(() => { 
                setPasswordIncorrect(true)
            }, 3000)
        }
    }



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
                <input   name="email" type="text" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">   E-mail </label>      
            </div>
            <div className="">
                <input   name="email" type="email" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Rol de Usuario </label>      
            </div>
            <div className="">
                <select className='block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={(e) => setUserRol(e.target.value)} value={userRol}>
                    <option disabled selected> Elegi un Rol</option>
                    <option>Administrador</option>
                    <option>Empleado</option>
                </select>
                
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Contraseña </label>      
            </div>
            <div className="">
                <input   name="email" type="password" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
            </div>
        </div>

        <div className='mt-2'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Repetir Contraseña </label>      
            </div>
            <div className="">
                <input   name="email" type="password" autoComplete="email" required className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={userFirstPassword} onChange={(e) => setUserFirstPassword(e.target.value)}/>
            </div>
        </div>


       {succesMessagge ? 
        <div className='mt-6 flex items-center justify-center'>
           <button  type="submit" className="flex border border-none focus:outline-none justify-center rounded-xl px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-48"style={{backgroundColor:"#768BAB"}} onClick={() => registerNewUser()}> REGISTRARME </button>
        </div>
         :
         <div>
            <p className='font-sm font-bold' style={{color:"#768BAB"}}>Usuario Creado con Exito ✔</p>
         </div>
        }

        {passwordIncorrect ? null :  
        <>
            <div className=' flex items-center justify-center '>
                <p className='font-bold text-xs  mt-8 text-center' style={{color:"#768BAB"}}> Las contraseñas no coinciden. Vuelve a intentarlo </p>
            </div>  
        </>
        }  
      
</div>
</div>
  )
}

export default Register
