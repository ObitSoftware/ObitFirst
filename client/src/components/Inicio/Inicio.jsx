import React from 'react'
import { useState } from 'react'
import logoObit from "../../img/obitMainLogo.png"
import homeicon from "../../img/homeUno.png"
import lapizicon from "../../img/lapizblanco.png"
import financeicon from "../../img/FinanceUno.png"
import estadisctisIcon from "../../img/EstadisticsUno.png"
import tesoreriaIcon from "../../img/TesoreriaUno.png"
import configIcon from "../../img/confi.png"
import doubleArrow from "../../img/doubleArrowRight.png"
import imgInicio from "../../img/imgInicio.png"
import {useNavigate} from "react-router-dom"
import { Link} from 'react-router-dom';

const Inicio = ({updateBackgroundColor}) => {


    const navigate = useNavigate()

    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const [isHoveredLapiz, setIsHoveredLapiz] = useState(false);
    const [isHoveredEstadistics, setIsHoveredEstadistics] = useState(false);
    const [isHoveredFinance, setIsHoveredFinance] = useState(false);
    const [isHoveredTesoreria, setIsHoveredTesoreria] = useState(false);
    const [isHoveredConfig, setIsHoveredConfig] = useState(false);

    const divStyles = {
      background: 'rgba(33, 118, 190, 0.70)',
      transition: 'all 300ms'    
    }; 

    const goToPage = (route) => { 
      navigate(`${route}`)
      setTimeout(() => { 
        window.location.reload()
      }, 200)
    }

   



  return ( 
    <>
      <div className="w-[1200px] 2xl:w-[1550px] h-full "> 
            <div className='flex flex-col items-center mt-10 2xl:mt-20'>
                <div className='flex gap-2 items-center'>
                  <h2 className='font-medium text-white text-[40px] 2xl:text-[50px]'>¡ BIENVENIDO A</h2>
                  <img src={logoObit} className='w-auto h-9 2xl:h-11 object-contain'/>
                  <h2  className='font-medium text-white text-[40px] 2xl:text-[50px]'>!</h2>
               </div>
               <div className='mt-4'>
                  <h3 lassName='font-medium text-[40px] 2xl:text-[50px]' style={{color: "white"}}>SISTEMA DE GESTION</h3>
               </div>
            </div>
            <div className='flex justify-start mt-6 2xl:mt-8'>
                <div className='flex flex-col w-full'> 
                       <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' onClick={() => goToPage("/tables")}  style={isHoveredHome ? divStyles : {}} onMouseEnter={() => setIsHoveredHome(true)} onMouseLeave={() => setIsHoveredHome(false)} >
                          <div className='flex gap-6 items-center m-2'>
                              <img className=' h-8 w-8 object-contain' src={homeicon}/>
                              {isHoveredHome ? <p className='font-medium text-sm 2xl:text-md text-white'>TABLERO PERSONAL / INICIO</p> : null}
                          </div>
                          {isHoveredHome ? 
                             <div className='flex gap-80 2xl:gap-96 items-center'>
                                <div className='flex gap-0 items-center m-2'>
                                    <img src={doubleArrow} className='w-8 h-8'/>
                                    <img src={doubleArrow} className='w-8 h-8'/>
                                </div> 
                                <div className='fixed items-center ml-36'>
                                  <img src={imgInicio} className='w-auto mt-80 2xl:mt-72 h-96'/>
                                </div>
                             </div>                   
                          : null}
                      </div>             
                   <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' style={isHoveredLapiz ? divStyles : {}} onMouseEnter={() => setIsHoveredLapiz(true)} onMouseLeave={() => setIsHoveredLapiz(false)} >
                    <div className='flex gap-6 items-center m-2'>
                        <img className=' h-8 w-8 object-contain' src={lapizicon}/>
                        {isHoveredLapiz ? <p className='font-medium text-sm 2xl:text-md text-white'>ACCIONAR</p> : null}
                    </div>
                        {isHoveredLapiz && (
                            <div className='flex gap-80 2xl:gap-96 items-center'>
                            <div className='flex gap-0 items-center m-2'>
                               <img src={doubleArrow} className='w-8 h-8'/>
                               <img src={doubleArrow} className='w-8 h-8'/>
                            </div> 
                            <div className='fixed items-center ml-64 2xl:ml-72'>
                              <img src={imgInicio} className='w-auto mt-52 2xl:mt-36 h-96'/>
                            </div>
                          </div> 
                            )}
                   </div>
                   <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' style={isHoveredEstadistics ? divStyles : {}} onMouseEnter={() => setIsHoveredEstadistics(true)} onMouseLeave={() => setIsHoveredEstadistics(false)} >
                    <div className='flex gap-6 items-center m-2'>
                        <img className=' h-8 w-8 object-contain' src={estadisctisIcon}/>
                    {isHoveredEstadistics ? <p className='font-medium text-sm 2xl:text-md text-white'>ESTADISTICAS</p> : null}
                    </div>
                    {isHoveredEstadistics ? 
                      <div className='flex gap-80 2xl:gap-96 items-center'>
                          <div className='flex gap-0 items-center m-2'>
                             <img src={doubleArrow} className='w-8 h-8'/>
                             <img src={doubleArrow} className='w-8 h-8'/>
                          </div> 
                         <div className='fixed items-center ml-60 2xl:ml-72'>
                            <img src={imgInicio} className='w-auto mt-28 2xl:mt-20 h-96'/>
                         </div>
                    </div> 
                    : null}
                   </div>
                   <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' style={isHoveredFinance ? divStyles : {}} onMouseEnter={() => setIsHoveredFinance(true)} onMouseLeave={() => setIsHoveredFinance(false)} >
                      <div className='flex gap-6 items-center m-2'>
                          <img className=' h-8 w-8 object-contain' src={financeicon}/>
                      {isHoveredFinance ? <p className='font-medium text-sm 2xl:text-md text-white'>FINANZAS</p> : null}
                      </div>
                      {isHoveredFinance ?
                      <div className='flex gap-80 2xl:gap-96 items-center'>
                        <div className='flex gap-0 items-center m-2'>
                            <img src={doubleArrow} className='w-8 h-8'/>
                            <img src={doubleArrow} className='w-8 h-8'/>
                        </div> 
                        <div className='fixed items-center  ml-64 2xl:ml-72'>
                          <img src={imgInicio} className='w-auto mb-4 2xl:mb-36 h-96'/>
                        </div>
                    </div> 
                    : null}
                   </div>
                   <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' style={isHoveredTesoreria ? divStyles : {}} onMouseEnter={() => setIsHoveredTesoreria(true)} onMouseLeave={() => setIsHoveredTesoreria(false)} >
                      <div className='flex gap-6 items-center m-2'>
                          <img className=' h-8 w-8 object-contain' src={tesoreriaIcon}/>
                          {isHoveredTesoreria ? <p className='font-medium text-sm 2xl:text-md text-white'>TESORERIA</p> : null}
                      </div>
                      {isHoveredTesoreria ?
                    <div className='flex gap-80 2xl:gap-96 items-center'>
                          <div className='flex gap-0 items-center m-2'>
                            <img src={doubleArrow} className='w-8 h-8'/>
                            <img src={doubleArrow} className='w-8 h-8'/>
                          </div> 
                        <div className='fixed items-center  ml-64 2xl:ml-72'>
                          <img src={imgInicio} className='w-auto mb-28 2xl:mb-48 h-96'/>
                        </div>
                    </div> 
                : null}
                   </div>
                   <div className='flex gap-4 mt-2 2xl:mt-10 items-center 2xl:gap-8 w-full cursor-pointer' style={isHoveredConfig ? divStyles : {}} onMouseEnter={() => setIsHoveredConfig(true)} onMouseLeave={() => setIsHoveredConfig(false)} >
                      <div className='flex gap-6 items-center m-2'>
                          <img className=' h-8 w-8 object-contain' src={configIcon}/>
                      {isHoveredConfig ? <p className='font-medium text-sm 2xl:text-md text-white'>CONFIGURACION</p> : null}
                      </div>
                      {isHoveredConfig ?
                        <div className='flex gap-80 2xl:gap-96 items-center'>
                          <div className='flex gap-0 items-center m-2'>
                              <img src={doubleArrow} className='w-8 h-8'/>
                              <img src={doubleArrow} className='w-8 h-8'/>
                          </div> 
                          <div className='fixed items-center  ml-56 2xl:ml-72'>
                            <img src={imgInicio} className='w-auto mb-52 2xl:mb-80 h-96'/>
                          </div>
                        </div> 
                    : null}
                   </div>
                </div>
            </div>
      </div>  
      <div>
        <p></p>
      </div>
    </>
  
  )
}

export default Inicio
