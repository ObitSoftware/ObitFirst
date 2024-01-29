import React, { useContext } from 'react'
import logo from "../img/obitLogoSmall.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import obitLogoSmall from "../img/obitLogoSmall.png"
import eye from "../img/eye.png"
import { formatePrice } from '../functions/formatPrice';



const Login = () => { 

    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [succesMessagge, setSuccesMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [textMessage, setTextMessage] = useState(false)

  

    const loginMySession = () => { 
      if(email.length === 0 || password.length === 0) { 
        setErrorMessage(true)
        setTextMessage("Debes completar todos los campos")
        setTimeout(() => { 
          setErrorMessage(false)
          setEmail("")
          setPassword("")
        }, 2500)
      } else  { 
        const userData = ({ 
          email,
          password
        })
        axios.post("http://localhost:3000/usuario/login", userData)
             .then((res) => { 
              console.log(res.data)
              if(res.data.message === "El email no se encuentra registrado") { 
                setErrorMessage(true)
                setTextMessage("El email ingresado no es correcto")
                setTimeout(() => { 
                  setErrorMessage(false)
                  setEmail("")
                  setPassword("")
                }, 2500)
              } else if (res.data.message === "La contraseña es incorrecta") { 
                setErrorMessage(true)
                setTextMessage("La contraseña es incorrecta")
                setTimeout(() => { 
                  setErrorMessage(false)
                  setEmail("")
                  setPassword("")
                }, 2500)
              } else { 
                setSuccesMessage(true)
                userCtx.updateUser(res.data.id)
                userCtx.updateUserName(res.data.name)
                userCtx.updateUserRol(res.data.role)
                userCtx.updateUserEmail(res.data.email)
              
                setTimeout(() => {
                    navigate("/main")
                }, 2000);
              }            
             })
             .catch((err) => { 
              console.log(err)
             })
      }
    }
     
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">

               
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">  
                <div className=" flex text-center h-16 w-16 justify-center rounded-full" style={{backgroundColor:"#D3D3D3"}}>
                  <img src={obitLogoSmall} className="h-12 w-12 m-2"/>
                </div>
                <div>
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">INICIAR SESION</h2>
                </div>
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
                    value={email}
                    required 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" 
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
                value={password}
                endContent={eye}
                required 
                className="block w-full rounded-md border-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-none  sm:text-sm sm:leading-6" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>


                <div className="text-sm flex justify-end">
                <a href="#" className="text-black text-xs hover:text-gray-400 underline mt-2"> ¿Olvido su contraseña? </a>
                </div>
        </div>


            <div className='mt-6'>
                 <button  
                 type="submit" 
                 className="flex  justify-center rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-72"
                 style={{backgroundColor:"#4C70A5"}} 
                 onClick={() => loginMySession()}>
                 INICIAR SESION
                </button>
            </div>

        <div className='mt-6'>
        <Link to={"/register"}> 
            <button  type="submit" className="flex  justify-center rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cus-visible:outline w-72" style={{backgroundColor:"#768BAB"}} >
                REGISTRARME
            </button> 
          </Link> 
        </div>
        
          {succesMessagge ?  
                <div className='mt-8'>
                  <p className='text-sm font-bold' style={{color:"#728EC3"}}>Iniciando sesion</p>
                </div>    
           : null}

      {errorMessage ? <p className='mt-8 font-bold text-xs' style={{color:"#728EC3"}} >{textMessage}</p> : null}

    </div>
  </div>
  )
}

export default Login
