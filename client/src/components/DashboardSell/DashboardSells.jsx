import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import QuantityProductSell from '../Graficos/QuantityProductSell';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';
import { getMonthGains, getAllGains, getImprovementPercentage, getTotalYearMoneyFactured, getTotalMonthMoneyFactured, bestSells} from './FunctionsGetDataOfSells';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import {Link} from "react-router-dom"


const DashboardSells = () => {

    const [totalMonthGains, setTotalMonthGains] = useState(null);
    const [totalEverGains, setTotalEverGains] = useState(null);
    const [porcentage, setPorcentage] = useState(null);
    const [totalAnualFactured, setTotalAnualFactured] = useState(null);
    const [totalMonthFactured, setTotalMonthFactured] = useState(null);
    const [bestFiveSells, setBestFiveSells] = useState([]);
    const [showTotalAnualFactured, setShowTotalAnualFactured] = useState(true)
    const [showTotalMonthFactured, setShowTotalMonthFactured] = useState(false)
    const [selectedOption, setSelectedOption] = useState(" Monto total Anual Facturado ")
    const userCtx = useContext(UserContext)



      useEffect(() => {
        const fetchData = async () => {
          try {          
            const gains = await getMonthGains();
            const gainsFormated = formatePrice(gains);
            setTotalMonthGains(gainsFormated);
            
            const thePorcentage = await getImprovementPercentage();
            setPorcentage(thePorcentage);   
            
            const allGains = await getAllGains();
            const formatedPrice = formatePrice(allGains);
            setTotalEverGains(formatedPrice); 
            
            const totalAnualFacturedAtTheMoment = await getTotalYearMoneyFactured();
            const totalFormatedAnual = formatePrice(totalAnualFacturedAtTheMoment);
            setTotalAnualFactured(totalFormatedAnual);
        
            const totalMonthFacturedAtTheMoment = await getTotalMonthMoneyFactured();
            const totalFormatedMonth = formatePrice(totalMonthFacturedAtTheMoment);
            setTotalMonthFactured(totalFormatedMonth);
      
            const bestFive = await bestSells();
            setBestFiveSells(bestFive);
          } catch (error) {
            console.error(error);
          }
        }; 
        fetchData();
      }, []);
  
      const showOneData = (first, second) => { 
        setShowTotalAnualFactured(first)
        setShowTotalMonthFactured(second)
    
      }  
    
      const handleClick = (opcion) => {
        setSelectedOption(opcion);
      };
       
      const getMonthName = () => {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const fechaActual = new Date();
        const numeroMes = fechaActual.getMonth();
        return meses[numeroMes];
      };
    
      const monthName = getMonthName();
    
      const getActualYear = () => {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        return anio;
      };
      
      const actualYear = getActualYear();



  return ( 
    <>
    {userCtx.userId && userCtx.userId.length >= 10 ? 
     <div className='flex flex-col  text-center items-center justify-center ml-44 mt-24 2xl:mt-2'>
            <div className='flex justify-start items-start mb-4 2xl:mb-8 w-full'>
                <p className='font-medium text-sm 2xl:text-md' style={{color:"#A1ABBF"}}>VENTAS</p>  
            </div> 
         <div class="grid grid-cols-3 gap-4 ">
            <div class="col-span-2">
                <div className='flex gap-4'>
                      <div className='w-4/5 '>
                          <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                              <CardBody>
                              <div className='flex items-start justify-start ml-4'>
                                  <p className='text-zinc-600  font-medium font-inter text-lg'>Ventas Mensuales</p>
                              </div>
                              <div className='flex items-center justify-center flex-grow mt-4'>
                                  <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                                              <VentasPorMes/>                            
                                  </div>
                              </div>
                              </CardBody>
                          </Card>
                      </div>
                      <div className='w-1/5 '>
                          <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                              <CardBody>
                                      <div className='flex items-start justify-start gap-2'>
                                        <Dropdown>                                      
                                          <DropdownTrigger>                                           
                                            <div className='flex items-center cursor-pointer'> 
                                              <img src={arrowGreen} className='h-2 w-2 mr-2'/> 
                                              <small className='text-zinc-600  font-medium font-inter text-sm'>{selectedOption}</small> 
                                            </div>
                                          </DropdownTrigger>
                                          <DropdownMenu aria-label="Dynamic Actions">
                                            <DropdownItem onClick={() => { handleClick('Monto total Anual Facturado'); showOneData(true, false); }}>
                                              Monto total Anual Facturado 
                                            </DropdownItem> 
                                            <DropdownItem onClick={() => { handleClick('Monto total Mensual Facturado'); showOneData(false, true); }}>
                                              Monto total Mensual Facturado
                                            </DropdownItem> 
                                          </DropdownMenu>
                                        </Dropdown>
                                      </div>
                                  <div className='flex items-center justify-center mt-4'>
                                          {showTotalAnualFactured ?    
                                            <div className='flex flex-col items-center justify-center mt-4 '>
                                              <div className='border border-green-400 rounded-lg w-full'>
                                                <p className='font-medium text-xl  rounded-lg m-1 ml-2 mr-2' style={{color:"#327D65"}}>{totalAnualFactured} </p>
                                              </div>
                                                 <img src={factured} className='w-14 h-14 2xl:w-16 2xl:h-16 mt-8 2xl:mt-4 object-fit-contain'/>
                                            </div>                                                                         
                                                                
                                          :   
                                          null}

                                          {showTotalMonthFactured ?                                            
                                             <div className='flex flex-col items-center justify-center mt-4'>
                                                 <p className='font-medium text-xl' style={{color:"#327D65"}}>{totalMonthFactured} </p>   
                                                 <img src={factured} className='w-16 h-16 mt-8 2xl:mt-4 object-fit-contain'/>
                                             </div>                                            
                                          : 
                                          null}
                                  </div>                 
                              </CardBody>
                          </Card>
                      </div>
                </div>
            </div>

            <div class="col-span-2 "> 
              <div className='flex '>
                <div className='w-5/12 2xl:w-4/12'>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='mt-2 w-full'>
                   
                      <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                              <CardBody className='flex '>              
                                  <div className='flex flex-col '>
                                    <div className='flex w-full justify-between'>
                                        <div className='flex items-center justify-start'>
                                            <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                            <p className='text-xs ml-2'>Ganancia NETA Anual</p>   
                                         </div>
                                         <div className='flex items-center justify-end'>
                                            <p className='text-xs'>{actualYear}</p>
                                          </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-4'>
                                    <p className='text-xl font-bold' style={{color:"#568CCB"}}> {totalEverGains !== null ? totalEverGains : 'Cargando...'}</p>
                                    </div>
                                  </div>
                                </CardBody>
                          </Card>
                      </div>
                      <div className='mt-2 w-full'>
                          <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                              <CardBody className='flex '>
                                <div className='flex flex-col '>
                                  <div className='flex w-full justify-between '>
                                    <div className='flex items-center justify-start'>
                                      <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                      <p className='text-xs ml-2'>Ganancia NETA Mensual</p>   
                                    </div>
                                    <div className='flex items-center justify-end'>
                                      <p className='text-xs'>{monthName}</p>
                                    </div>
                                  </div>
                                  <div className='flex items-center justify-center mt-4'>
                                    <p className='text-xl font-bold' style={{color:"#568CCB"}}> {totalMonthGains !== null ? totalMonthGains : 'Cargando...'}</p>
                                  </div>
                                </div>
                                <div>
                                </div>
                              </CardBody>
                          </Card>
                      </div>
                        <div className='mt-2 w-full'>
                             <Card isHoverable={true} className=' bg-white h-24 rounded-xl flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>
                                <CardBody className="flex">
                                   <div className='flex items-center justify-start'>   
                                      <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                      <p className='text-xs ml-2'>Porcentaje de Crecimiento en Comparacion al mes Pasado</p>   
                                    </div>
                                    {porcentage === null ? 
                                      <div className='flex items-center justify-center mt-4'>
                                          <p className='font-bold' style={{color:"#728EC3"}}>Cargando</p>
                                      </div>
                                            :
                                        <div className='flex items-center justify-center mt-2'>
                                            <p className='text-xl font-bold' style={{color:"#56CB69"}}>+ {porcentage} %</p>
                                          </div>
                                        }
                                  </CardBody>
                               </Card>
                         </div>
                    </div>
                </div>
                <div className='w-9/12 2xl:w-9/12 '>
                    <Card isHoverable={true} className='bg-white h-full flex items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                        <CardBody>
                            <div className='flex items-center justify-start gap-2'>
                                <p className='text-zinc-600  font-medium font-inter text-lg'>Ventas por Categoria</p>
                            </div>
                            <div className='flex items-center justify-center mt-4  h-full w-auto'>                          
                              <QuantityProductSell/>                            
                            </div>
                        </CardBody>
                    </Card>
                </div>
              </div>
            </div>

            <div class="col-start-3 row-start-1 row-span-2 w-72 ">
                       <Card  isHoverable={true} 
                              style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)", background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.89) 28.43%, #DAE8FD 100%)' }} 
                              className='h-full flex items-center justify-center w-full'>
                            <CardBody>
                                <div className='flex items-center justify-start gap-2 mt-2'>
                                    <img src={arrowDash} className='h-2 object-fit w-2'/>
                                    <p className='font-medium text-zinc-600 font-inter text-sm'>TOP 5 VENTAS</p>
                                </div>
                                 {bestFiveSells.length !== 0 ?
                                   <div className='flex flex-col items-center justify-center mt-8'>
                                     <div className='flex flex-col'>
                                     {bestFiveSells.map((p) => ( 
                                       <div className=' flex flex-col items-start mt-4'>
                                         <div className='flex'>
                                           <img src={start} className='h-4 w-4 object-fit-contain'/>
                                           <p style={{color:"#728EC3"}} className='text-md'>{p.nombreCliente}</p>
                                         </div>
                                         <div className='flex flex-col ml-4'>
                                           <p className='text-sm' style={{color:"#728EC3"}}>{p.nombreProducto}</p>
                                           <p className='text-lg font-bold mt-2' style={{color:"#4C83EA"}}>{formatePrice(p.total)}</p>
                                         </div>                            
                                       </div>  
                                     ))}
                                            
                                   </div>
                                </div>
                                :
                                <div className='flex items-center justify-center mt-6'>
                                  <p className='font-bold' style={{color:"#728EC3"}}>Cargando..</p>
                                </div>
                                } 
                            </CardBody>
                        </Card>
            </div>

         </div>
     </div>
      : 
      <div>
         <p style={{color:"#728EC3"}} className='text-lg font-medium'>Debes iniciar Sesion</p>     
        <Link to={"/"}><p className='text-sm font-bold mt-8' style={{color:"#728EC3"}}> Iniciar sesion </p></Link>   
     </div>
     }
    </>
    

    
     
     
  
  )
}

export default DashboardSells


/*

  <div class="grid grid-cols-3 gap-4">

        <div class="col-span-2 bg-blue-300">
          <div className='flex gap-2'>
             <div className='w-4/5 border bg-red-500'>
                 Ventas mensuales
             </div>
             <div className='w-1/5 border bg-red-200'>
                Monto total Anual Facturado
             </div>
          </div>
        </div>



        <div class="col-span-2 bg-yellow-300"> 
           <div className='flex gap-2'>
             <div className='w-1/5 border bg-red-500'>
                 Ganancia Neta Anual
                 Ganancia Neta Mensual  
                 Porcentaje de Ganancias
             </div>
             <div className='w-4/5 border bg-red-200'>
                Ventas por Categoria
             </div>
          </div>
        </div>



        <div class="bg-red-300 col-start-3 row-start-1 row-span-2">
          Top 5 ventas
        </div>

    </div>

*/
