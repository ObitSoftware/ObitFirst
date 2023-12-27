import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import QuantityProductSell from '../Graficos/QuantityProductSell';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';
import { getMonthGains, getAllGains, getImprovementPercentage, getTotalYearMoneyFactured, getTotalMonthMoneyFactured, bestSells} from '../DashboardSell/FunctionsGetDataOfSells';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"
import arrowDown from "../../img/arrowDown.png"

import { getTotalInvertedAmount } from '../DashboardPuchaseDetail/FunctionsGetDataOfPurchase';
import { getAllProviders, totalMoneySpentBySupplier, topProvidersByNetGains } from './FunctionsGetDataOfProviders';
import ProvidersSells from '../Graficos/ProvidersSells';
import ProvidersPurchaseRanking from '../Graficos/ProvidersPurchase';
import ProviderPurchaseDetail from '../Modals/ProviderPurchaseDetail';




const DashboardProviders = () => {

    const [totalMonthGains, setTotalMonthGains] = useState(null);
    const [totalEverGains, setTotalEverGains] = useState(null);
    const [porcentage, setPorcentage] = useState(null);
    const [totalAnualFactured, setTotalAnualFactured] = useState(null);
    const [totalMonthFactured, setTotalMonthFactured] = useState(null);
    const [bestFiveSells, setBestFiveSells] = useState([]);
    const [showTotalAnualFactured, setShowTotalAnualFactured] = useState(true)
    const [showTotalMonthFactured, setShowTotalMonthFactured] = useState(false)
    const [selectedOption, setSelectedOption] = useState(" Monto total Anual Facturado ")

    const [totalInvertedEver, setTotalInvertedEver] = useState("")
    const [totalInvertedByProvider, setTotalInvertedByProvider] = useState("")
    const [providersName, setProvidersName] = useState("")
    const [providerSelected, setProviderSelected] = useState("")
    const [topFiveProvidersNetGain, setTopFiveProvidersNetGain] = useState(null)
    const [monthSelected, setMonthSelected] = useState("")

      useEffect(() => {
        const fetchData = async () => {
          try {
            const topFive = await topProvidersByNetGains();
            setTopFiveProvidersNetGain(topFive);
      
            const allProviders = await getAllProviders();
            setProvidersName(allProviders);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      
        
        const totalInvertedInOneProvider = async () => {
          try {
            const amountInverted = await totalMoneySpentBySupplier();
            setTotalInvertedByProvider(amountInverted);
          } catch (error) {
            console.error(error);
          }
        }; 
        totalInvertedInOneProvider();
        
        const fetchOtherData = async () => {
          try {
            const totalInverted = await getTotalInvertedAmount();
            const formatedPrice = formatePrice(totalInverted);
            setTotalInvertedEver(formatedPrice);
      
            const gains = await getMonthGains();
            const gainsFormated = formatePrice(gains);
            setTotalMonthGains(gainsFormated);
      
            const thePorcentage = await getImprovementPercentage();
            setPorcentage(thePorcentage);
      
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
      
        fetchOtherData();
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
    
     <div className='flex flex-col  text-center items-center justify-center ml-44 mt-24 2xl:mt-2'>
            <div className='flex justify-start items-start mb-4 2xl:mb-8 w-full'>
                <p className='font-medium text-sm 2xl:text-md' style={{color:"#A1ABBF"}}>PROVEEDORES</p>  
            </div> 
         <div class="grid grid-cols-3 gap-4 ">
            <div class="col-span-2">
                <div className='flex gap-4'>
                      <div className='w-4/5 '>
                          <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                              <CardBody>
                              <div className='flex items-start justify-between ml-4'>
                                <div className='flex items-center justify-start'>
                                  {monthSelected === "" ?
                                   <p className='text-zinc-600  font-medium font-inter text-lg'>Cantidad de compras por Proveedor</p> 
                                   :
                                   <p className='text-zinc-600  font-medium font-inter text-lg'>Cantidad de compras por Proveedor en {monthSelected}</p> 
                                   }
                                </div>
                                <div className='flex items-center justify-start'>
                                      <Dropdown>                                      
                                          <DropdownTrigger>                                           
                                            <div className='flex items-center cursor-pointer'>                                            
                                              <small className='text-zinc-600  font-medium font-inter text-xs'>Todos los meses</small> 
                                              <img src={arrowDown} className='h-2 w-2 ml-2'/> 
                                            </div>
                                          </DropdownTrigger>
                                          <DropdownMenu aria-label="Dynamic Actions">
                                                <DropdownItem onClick={() => setMonthSelected("")}>Todos los meses</DropdownItem>    
                                                <DropdownItem onClick={() => setMonthSelected("enero")}>Enero</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("febrero")}>Febrero</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("marzo")}>Marzo</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("abril")}>Abril</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("mayo")}>Mayo</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("junio")}>Junio</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("julio")}>Julio</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("agosto")}>Agosto</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("septiembre")}>Septiembre</DropdownItem>     
                                                <DropdownItem onClick={() => setMonthSelected("octubre")}>Octubre</DropdownItem>    
                                                <DropdownItem onClick={() => setMonthSelected("noviembre")}>Noviembre</DropdownItem>  
                                                <DropdownItem onClick={() => setMonthSelected("diciembre")}>Diciembre</DropdownItem>                                                                                    
                                          </DropdownMenu>
                                        </Dropdown>
                                </div>                      
                              </div>
                              <div className='flex items-center justify-center flex-grow mt-4'>
                                  <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                                              <ProvidersPurchaseRanking/>                            
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
                                              <small className='text-zinc-600  font-medium font-inter text-sm'>Monto total Anual Facturado</small> 
                                            </div>
                                          </DropdownTrigger>
                                          <DropdownMenu aria-label="Dynamic Actions">
                                            <DropdownItem onClick={() => { handleClick('Monto total Anual Facturado'); showOneData(true, false); }}>                                  
                                               Top Proveedores por Rentabilidad                                    
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


                {/* Inversion por Proveedor */}
                 <div className='w-5/12 2xl:w-4/12'>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='mt-2 w-full'>                
                        <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                              <CardBody className='flex '>              
                                  <div className='flex flex-col '>
                                    <div className='flex w-full justify-between'>
                                        <div className='flex items-center justify-start'>
                                            <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                            <p className='text-xs ml-2'>Inversion por proveedor:</p>   
                                         </div>
                                         <div className='flex items-center justify-end'>
                                         <Dropdown >
                                                <DropdownTrigger>
                                                    <div className='flex items-center gap-2'>
                                                    <div className='flex gap-1 items-center  rounded-lg cursor-pointer' style={{backgroundColor:"#DAEFFF"}}>
                                                        {providerSelected === "" ?  <small className='text-xs text-slate-700 m-1'>Todos</small> :  <small className='text-xs text-slate-700 m-1'>{providerSelected}</small>}
                                                        <img src={arrowDown} className='h-2 w-2 mr-2'/>
                                                    </div>                             
                                                    </div>
                                                </DropdownTrigger>
                                                {providersName.length !== 0 ?
                                                    <DropdownMenu aria-label="Action event example" className='max-h-96 overflow-y-auto'  onAction={(key) => console.log(key)}>
                                                        <DropdownItem onClick={() => setProviderSelected("")}>Ver Total</DropdownItem>
                                                        {providersName.map((p) => ( 
                                                            <DropdownItem key={p._id} onClick={() => setProviderSelected(p.nombre)}>{p.nombre}</DropdownItem>
                                                        ))}                
                                                    </DropdownMenu>
                                                    :
                                                <p>Cargando</p>   
                                                }
                                                </Dropdown>
                                          </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-4'>
                                       {providerSelected === "" ? (
                                                 <p className='text-xl font-bold' style={{color:"#568CCB"}}>{totalInvertedEver}</p>
                                                ) : (
                                                totalInvertedByProvider
                                                    .filter((p) => p.nombre.includes(providerSelected))
                                                    .map((p, index) => (
                                                        <p className='text-xl font-bold' style={{color:"#568CCB"}} key={index}> {formatePrice(p.monto)} </p>
                                                    ))
                                                )}
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
                                      <p className='text-xs ml-2'>Monto Invertido a cada proveedor:</p>   
                                    </div>
                                    <div className='flex items-center justify-end'>
                                      <p className='text-xs'>{actualYear}</p>
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
                                      <p className='text-xs ml-2 '>Retorno de Inversion del Proveedor</p>   
                                    </div>
                                    {providerSelected === "" ? 
                                      <div className='flex items-center justify-center mt-4'>
                                          <p className='font-medium text-xs' style={{color:"#728EC3"}}>Sin Proveedor Seleccionado</p>
                                      </div>
                                            :
                                            <div className='flex flex-col '>
                                               <div className='flex items-center justify-between mt-2'>
                                                  {totalInvertedByProvider.filter((t) => t.nombre[0] === providerSelected).map((total) => ( 
                                                      <p className='font-medium text-sm' style={{color:"#568CCB"}}>Inversion: {formatePrice(total.monto)}</p>
                                                    ))}

                                                    {topFiveProvidersNetGain.filter((t) => t.nombre === providerSelected).map((prov) => ( 
                                                      <p className='font-medium text-sm' style={{color:"#568CCB"}}>Ganancia: {formatePrice(prov.gananciaNeta)} </p>
                                                    ))}                                         
                                                </div>
                                                <div className='flex justify-center items-center '>
                                                   <p  style={{color:"#568CCB"}} className='font-bold text-sm'>
                                                     {(((topFiveProvidersNetGain.find((t) => t.nombre === providerSelected)?.gananciaNeta || 0) -
                                                      (totalInvertedByProvider.find((t) => t.nombre[0] === providerSelected)?.monto || 0)) /
                                                      (totalInvertedByProvider.find((t) => t.nombre[0] === providerSelected)?.monto || 1) * 100).toFixed(2)} %
                                                   </p>
                                                </div>
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
                                <p className='text-zinc-600  font-medium font-inter text-lg'>Cantidad de productos vendidos por Proveedor</p>
                            </div>
                            <div className='flex items-center justify-center mt-4  h-full w-auto'>                          
                              <ProvidersSells/>                          
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
                                    <p className='font-medium text-zinc-600 font-inter text-sm'>TOP 5 PROVEEDORES POR RENTABILIDAD</p>
                                </div>
                                 {topFiveProvidersNetGain !== null ?
                                   <div className='flex flex-col items-center justify-center mt-8'>
                                     <div className='flex flex-col'>
                                     {topFiveProvidersNetGain.slice(0, 5).map((p) => ( 
                                       <div className=' flex flex-col items-start mt-4'>
                                         <div className='flex'>
                                           <img src={start} className='h-4 w-4 object-fit-contain'/>
                                           <p style={{color:"#728EC3"}} className='text-md'>{p.nombre}</p>
                                         </div>
                                         <div className='flex flex-col ml-2'>
                                           <ProviderPurchaseDetail detail={p.detalleVenta} totalNetGain={p.gananciaNeta}/>
                                           <p className='text-lg font-bold mt-2' style={{color:"#4C83EA"}}>{formatePrice(p.gananciaNeta)}</p>
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

    
     
     
  
  )
}

export default DashboardProviders



/* 
Monto Total de Compras por Proveedor ($$):

Representa la suma total del dinero gastado en compras realizadas a cada proveedor. Ayuda a identificar los proveedores más significativos en términos de inversión.
Monto Total de Compras Mensuales por Proveedor (Número Entero):

Muestra la cantidad total de dinero gastado en compras a cada proveedor para cada mes, permitiendo evaluar la consistencia de la relación comercial.
Porcentaje de Variación en Gastos por Proveedor (%):

Calcula el porcentaje de crecimiento o disminución en los gastos de compras a cada proveedor en comparación con el período anterior. Proporciona información sobre la evolución de las relaciones comerciales.
Compras por Categoría de Proveedor (Gráfico):

Visualiza la distribución de tus gastos en compras entre diferentes categorías de proveedores. Puede incluir categorías como materias primas, servicios, etc.
Top Proveedores por Monto Total (Listado con Detalle):

Enumera los proveedores que han generado mayores gastos, detallando el monto total de compras y la frecuencia de transacciones. Facilita la identificación de asociaciones clave.
Top Proveedores por Rentabilidad (Listado como Imagen):

Clasifica los proveedores según la rentabilidad, considerando el margen de ganancia obtenido con sus productos o servicios. Ayuda a enfocarse en relaciones comerciales más beneficiosas.
Historial de Compras por Proveedor (Ranking Mensual):

Presenta un historial mes a mes de los proveedores más relevantes, indicando quiénes fueron los principales en cada período. Incluye detalles como monto gastado y cantidad de transacciones.
*/