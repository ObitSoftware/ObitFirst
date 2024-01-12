import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { getMonthGains, getAllGains, getImprovementPercentage, getTotalYearMoneyFactured, getTotalMonthMoneyFactured, bestSells} from '../DashboardSell/FunctionsGetDataOfSells';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowDown from "../../img/arrowDown.png"
import obtenerFechaActual from '../../functions/actualDate';
import { getTotalInvertedAmount } from '../DashboardPuchaseDetail/FunctionsGetDataOfPurchase';
import { getAllProviders, totalMoneySpentBySupplier, topProvidersByNetGains, nextPaymentDates } from './FunctionsGetDataOfProviders';
import ProvidersSells from '../Graficos/ProvidersSells';
import ProvidersPurchaseRanking from '../Graficos/ProvidersPurchase';
import ProviderPurchaseDetail from '../Modals/ProviderPurchaseDetail';
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import {Link} from "react-router-dom"




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
    const [nextPayments, setNextPayments] = useState("")
    const [monthSelected, setMonthSelected] = useState("") 
    const [actualDate, setActualDate] = useState(obtenerFechaActual())
    const userCtx = useContext(UserContext)


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
            
            const nextPaymentsData = await nextPaymentDates()
            setNextPayments(nextPaymentsData)
      
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

      useEffect(() => { 
       console.log("ACA BRO", nextPayments)
      }, [nextPayments])


  return ( 
    <> 
    {userCtx.userId && userCtx.userId.length >= 10 ? 
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
                                              <img src={arrowDown} className='h-2 w-2 mr-2'/> 
                                           {providerSelected === "" ?
                                             <small className='text-zinc-600  font-medium font-inter text-sm'>Monto total de Inversion</small> 
                                             : 
                                              <small className='text-zinc-600  font-medium font-inter text-sm'>Monto total Invertido en  <b>{providerSelected}</b></small> 
                                            }
                                            </div>
                                          </DropdownTrigger>
                                          {providersName.length !== 0 ?
                                                    <DropdownMenu aria-label="Action event example" className='max-h-96 overflow-y-auto'  onAction={(key) => console.log(key)}>
                                                       <DropdownItem onClick={() => setProviderSelected("")}>Ver Total Invertido</DropdownItem>
                                                        {providersName.map((p) => ( 
                                                            <DropdownItem key={p._id} onClick={() => setProviderSelected(p.nombre)}>{p.nombre}</DropdownItem>
                                                        ))}                
                                                    </DropdownMenu>
                                                    :
                                                <p>Cargando</p>   
                                                }                                           
                                        </Dropdown>
                                      </div>
                                  <div className='flex flex-col items-center justify-center mt-12 2xl:mt-8'>
                                             {providerSelected === "" ? 
                                                  <div className='flex flex-col items-center justify-center'>
                                                      <p className='text-xl font-bold' style={{color:"#317C65"}}>{totalInvertedEver}</p>  
                                                      <img src={factured} className='h-11 w-11 2xl:h-16 2xl:w-16 object-fit-contain mt-4'/>
                                                  </div>                                           
                                                 :
                                            <div className='flex flex-col items-center justify-center'>
                                                <div className='flex flex-col items-center justify-between mt-2'>
                                                    {totalInvertedByProvider.filter((t) => t.nombre[0] === providerSelected).map((total) => ( 
                                                      <div className='flex flex-col justify-center'>
                                                        <p className='font-medium text-xs 2xl:text-sm' style={{color:"#6E7177"}}>Inversion: </p>
                                                        <p style={{color:"#74C4FF"}} className='font-bold text-md'>{formatePrice(total.monto)}</p>
                                                      </div>
                                                    
                                                      ))}

                                                      {topFiveProvidersNetGain.filter((t) => t.nombre === providerSelected).map((prov) => ( 
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-medium text-xs 2xl:text-sm' style={{color:"#6E7177"}}>Ganancia: </p>
                                                            <p style={{color:"#74C4FF"}} className='font-bold text-md'>{formatePrice(prov.gananciaNeta)} </p>
                                                      </div>
                                                      
                                                      ))}                                         
                                                  </div>
                                                  <div className='flex justify-center items-center '> 
                                                    <div className='flex flex-col items-center justify-center'>
                                                      <p  style={{color:"#6E7177"}} className='font-bold text-xs 2xl:text-sm'> Estadistica:</p>
                                                          <div style={{borderColor: "#5FF087", borderStyle: "solid", borderWidth: "1px"}} className='rounded-xl mt-2 '>
                                                             <p style={{color:"#34AA55"}} className='font-bold m-2'>  {(((topFiveProvidersNetGain.find((t) => t.nombre === providerSelected)?.gananciaNeta || 0) -
                                                                (totalInvertedByProvider.find((t) => t.nombre[0] === providerSelected)?.monto || 0)) /
                                                                (totalInvertedByProvider.find((t) => t.nombre[0] === providerSelected)?.monto || 1) * 100).toFixed(2)} %
                                                             </p>
                                                         </div>
                                                    </div>                                          
                                                  </div>
                                            </div>                                       
                                        }
                                  </div>                 
                              </CardBody>
                          </Card>
                      </div>
                </div>
            </div>

            <div class="col-span-2 "> 
              <div className='flex gap-0 2xl:gap-4'>
                 <div className='w-5/12 2xl:w-4/12'>
                    <div className='flex flex-col items-center justify-center  h-full'>
                      <div className='mt-2 h-full w-full '>                
                        <Card isHoverable={true} className=' bg-white h-full flex  w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                              <CardBody>          
                                <div className='flex items-center justify-start gap-2'>
                                   <img src={arrowDash} className='h-2 object-fit w-2'/>
                                   <p className='text-xs text-zinc-600'>Proximas Fechas de Pago:</p>
                                </div>    
                                 {nextPayments.length !== 0 ? 
                                  <div className='flex flex-col justify-start  mt-6 ml-4'>
                                     {nextPayments.slice(0, 5).map((p) => ( 
                                      <div className='flex mt-2 gap-2'  key={p.proveedor + p.producto + p.fechadepago}>
                                        <ul className='flex mt-2 gap-2 list-disc'>
                                          <li className='font-medium text-xs'  style={{color:"#728EC3"}}>{p.proveedor} - {p.cantidad} {p.producto} - {p.fechadepago}</li>
                                        </ul>                                         
                                      </div>
                                     ))}
                                  </div>
                                  :
                                  <div className='flex items-center justify-center mt-8'>
                                    <p className='text-xs 2xl:text-sm font-medium'  style={{color:"#728EC3"}}>Cargando..</p>
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
      : 
      <div>
         <p style={{color:"#728EC3"}} className='text-lg font-medium'>Debes iniciar Sesion</p>     
        <Link to={"/"}><p className='text-sm font-bold mt-8' style={{color:"#728EC3"}}> Iniciar sesion </p></Link>   
     </div>
     }    
   </>  
     
  
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