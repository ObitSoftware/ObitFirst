import React from 'react'
import logo from "../img/obitLogoSmall.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => { 

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [succesMessagge, setSuccesMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

  

    const loginMySession = () => { 
      const userData = ({ 
        email,
        password
      })
      axios.post("http://localhost:3000/usuario/login", userData)
           .then((res) => { 
            console.log(res.data)
            setSuccesMessage(true)
            setTimeout(() => {
                navigate("/main")
            }, 2000);
           })
           .catch((err) => { 
            console.log(err)
           })
    }
     
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-16 w-auto m-2" src={logo}/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            INICIAR SESION
        </h2>
        </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">    
         <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm leading-6 text-gray-900">  Email de Usuario </label>      
                </div>
                <div className="mt-2">
                    <input id="email"  
                    name="email" type="email"
                    autoComplete="email" 
                    required 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm  leading-6 text-gray-900">
                    Contraseña
                    </label> 
                </div>
            <div className="mt-2">
                <input id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

                <div className="text-sm flex justify-end">
                <a href="#" className="font-semibold underline text-black"> ¿Olvido su contraseña? </a>
                </div>
        </div>

        {succesMessagge ? 
       
          <div className='mt-8'>
            <p className='text-sm font-bold' style={{text:"#728EC3"}}>Iniciando sesion</p>
          </div>    
          :
          <>
            <div className='mt-6'>
                    <button  type="submit" className="flex  justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-72" style={{backgroundColor:"#4C70A5"}} onClick={() => loginMySession()}>
                    INICIAR SESION
                    </button>
            </div>

        <div className='mt-6'>
        <Link to={"/register"}> 
            <button  type="submit" className="flex  justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-72" style={{backgroundColor:"#768BAB"}} >
                REGISTRARME
            </button> 
          </Link> 
        </div>
        </>
      }

    </div>
  </div>
  )
}

export default Login
