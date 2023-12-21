import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import { quantityOfProducts, calcularMontoTotal, getQuantityProductsCategory, topMoreBoughtProducts, topProductsWithMoreNetGains, getCategorys } from './FunctionsGetDataOfProducts';
import  HistoricGainsProduct  from '../Graficos/HistoricGainsProduct';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import VentasPorMes from '../Graficos/VentasPorMes';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"
import purchaseIcon from "../../img/purchaseIcon.png"
import arrowDown from "../../img/arrowDown.png"

const OtraPrueba = () => {

    const [totalQuantityProducts, setTotalQuantityProducts] = useState(null)
    const [totalMoneyInverted, setTotalMoneyInverted] = useState(null)
    const [quantityProductsOfCategory, setQuantityProductsOfCategory] = useState([])
    const [productsMoreBought, setProductsMoreBought] = useState([])
    const [productsWithMoreNetGains, setProductsWithMoreNetGains] = useState([])
    const [productsCategorys, setProductsCategorys] = useState([])
    const [monthSelected, setMonthSelected] = useState("")

    useEffect(() => {
        const getTotalQuantity = async () => {
          try {
            const quantity = await quantityOfProducts();
            setTotalQuantityProducts(quantity);
          } catch (error) {
            console.error(error);
          }
        };
        getTotalQuantity();
      }, []); 

      useEffect(() => { 
        const getAllCategorys = async () => { 
           try {
              const categorysUpdated = await getCategorys()
              const theResult = categorysUpdated
              setProductsCategorys(theResult)
           } catch (error) {
               console.error(error);
           }
        }
        getAllCategorys()
     }, [])

     
     useEffect(() => { 
        console.log("La cates:" ,productsCategorys)
     }, [productsCategorys])


      useEffect(() => { 
         const getTotalMoneyInverted = async () => { 
            try {
               const total = await calcularMontoTotal()
               const formatedNmber = formatePrice(total)
               setTotalMoneyInverted(formatedNmber)
            } catch (error) {
                console.error(error);
            }
         }
         getTotalMoneyInverted()
      }, [])


      useEffect(() => { 
        const getTotalByCategory = async () => { 
           try {
              const total = await getQuantityProductsCategory()
              setQuantityProductsOfCategory(total)
           } catch (error) {
               console.error(error);
           }
        }
        getTotalByCategory()
     }, [])

     
     useEffect(() => { 
        const getMoreBought = async () => { 
           try {
              const moreBought = await topMoreBoughtProducts()
              setProductsMoreBought(moreBought)
           } catch (error) {
               console.error(error);
           }
        }
        getMoreBought()
     }, [])

         
     useEffect(() => { 
        const getMoreNetGains = async () => { 
           try {
              const moreGains = await topProductsWithMoreNetGains()
              setProductsWithMoreNetGains(moreGains)
           } catch (error) {
               console.error(error);
           }
        }
        getMoreNetGains()
     }, [])




     useEffect(() => { 
         console.log(quantityProductsOfCategory)
     }, [quantityProductsOfCategory])


  return (
    <div className=' flex flex-col items-center ml-28 2xl:ml-0 mt-12 2xl:mt-2'>
         <div className='flex flex-col '>               
               <div className='flex  gap-4 2xl:gap-8 h-full'>
                  <div className='flex flex-col'>
                      <div className='w-96 2xl:w-[400px]'>
                        <div className='flex flex-col '>
                        <Card isHoverable={true} className='bg-white h-auto 2xl:h-28 flex items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                            <CardBody className='flex'>
                                <div className='flex items-center cursor-pointer'> 
                                    <img src={arrowDash} className='h-2 w-2 mr-2'/> 
                                    <small className='text-zinc-600 font-medium font-inter text-sm 2xl:text-md'>Cantidad total de Productos Disponibles</small> 
                                </div>  
                                <div className='flex items-center justify-center mt-2'>
                                <p style={{color:"#305C9F "}} className='text-center text-xl font-medium font-inter'>{totalQuantityProducts}</p>                          
                                </div>
                            </CardBody>
                        </Card>
                        </div>
                      </div>
                      <div  className='w-96 2xl:w-[400px] mt-10 2xl:mt-10'>
                          <div className='flex flex-col'>
                            <Card  isHoverable={true} className='bg-white h-auto 2xl:h-28 flex items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                                <CardBody className='flex'>
                                    <div className='flex justify-between items-center cursor-pointer'> 
                                      <div className='flex items-center gap-2'>
                                        <img src={arrowDash} className='h-2 w-2 mr-2'/> 
                                        <small className='text-zinc-600  font-medium font-inter text-sm 2xl:text-md'>Cantidad Invertido de Stock Anual</small> 
                                      </div>
                                      <div className='flex items-center gap-1'>                                     
                                        <small className='text-xs font-bold'>2023</small>
                                        <img src={arrowDown} className='h-2 w-2'/>
                                      </div>
                                    
                                    </div> 
                                    <div className='flex items-center justify-center mt-6'>
                                    <p className='text-xl font-bold' style={{color:"#327D65"}}> {totalMoneyInverted} </p>
                                    </div>
                                </CardBody>
                            </Card>
                           </div>
                      </div>
                  </div>
                  <div className='h-auto w-full  '>
                    <div className='flex flex-col h-full '>
                    <Card isHoverable={true} className='bg-white w-auto 2xl:w-[850px] h-auto 2xl:h-[280px] flex flex-col items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                    <CardBody>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center justify-start gap-2'>
                           {monthSelected === "" ? <p className='font-medium text-sm 2xl:text-lg text-zinc-600'>Historial de Ventas Historico</p> : <p className='font-bold text-xs'>Historial de Venta por producto del mes de {monthSelected}</p>}
                        </div>   
                        <div className='flex items-center justify-end'>
                        <Dropdown >
                            <DropdownTrigger>
                                <div className='flex items-center gap-1 cursor-pointer  rounded-lg bg-neutral-100'>
                                  {monthSelected === "" ? <small  className="text-xs font-medium" >Historico Total</small> : <small  className="text-xs font-medium" >{monthSelected}</small>}
                                  <img src={arrowDown} className='h-2 w-2'/>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" className='max-h-96 overflow-y-auto'  onAction={(key) => console.log(key)}> 
                            
                                <DropdownItem key="new"  onClick={() => setMonthSelected("enero")}>Enero</DropdownItem>
                                <DropdownItem key="copy" onClick={() => setMonthSelected("febrero")}>Febrero</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("marzo")}>Marzo</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("abril")}>Abril</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("mayo")}>Mayo</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("junio")}>Junio</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("julio")}>Julio</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("agosto")}>Agosto</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("septiembre")}>Septiembre</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("octubre")}>Octubre</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("noviembre")}>Noviembre</DropdownItem>
                                <DropdownItem key="edit" onClick={() => setMonthSelected("diciembre")}>Diciembre</DropdownItem>
                     
                            </DropdownMenu>
                            </Dropdown>
                        </div>               
                    </div>
                    <div className='flex items-center justify-center flex-grow mt-4'>
                        <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                           <RankingVentaProductos month={monthSelected}/>                            
                        </div>
                    </div>
                    </CardBody>
                </Card>                  
                    </div>
                  </div>
               </div>
               
               <div className=' flex gap-4 2xl:gap-8 mt-4'>
                   <div className=' flex flex-col w-96 2xl:w-[400px]'>
                   <Card isHoverable={true} className='bg-white h-60 2xl:h-72 flex items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                      <CardBody>
                           <div className='flex items-center cursor-pointer'> 
                               <img src={arrowDash} className='h-2 w-2 mr-2'/> 
                               <small className='text-zinc-600  font-medium font-inter text-sm'>Cantidad de Productos por Categoria</small> 
                           </div> 
                           <div className='flex justify-end items-center'>
                           <Dropdown >
                            <DropdownTrigger>
                                <div className='flex items-center gap-2'>
                                  <div className='flex gap-1 items-center  rounded-lg cursor-pointer' style={{backgroundColor:"#DAEFFF"}}>
                                     <small className='text-xs text-slate-700 m-1'>Categoria</small>
                                     <img src={arrowDown} className='h-2 w-2 mr-2'/>
                                  </div>                                  
                                </div>
                            </DropdownTrigger>
                               {productsCategorys.length !== 0 ?
                                <DropdownMenu aria-label="Action event example" className='max-h-96 overflow-y-auto'  onAction={(key) => console.log(key)}>
                                    {productsCategorys.map((c) => ( 
                                    <DropdownItem key={c._id} >{c.nombreCategoria}</DropdownItem>
                                    ))}                
                                </DropdownMenu>
                                :
                              <p>Cargando</p>   
                            }
                            </Dropdown>
                           </div>
                        <div className='flex items-center justify-center'>
                            {quantityProductsOfCategory.length !== 0 ? 
                            <div className='flex flex-col items-start justify-start text-start mt-8 '>
                              {quantityProductsOfCategory.map((p) => ( 
                                <ul className='flex gap-2'>
                                    <li className='font-bold text-sm' style={{color:'#728EC3'}}>{p.categoria} - {p.cantidad}</li>
                                </ul>
                               ))} 
                            </div>
                            :
                            <p  className='font-bold text-sm' style={{color:'#728EC3'}}>Cargando..</p>
                            }
                        </div>
                    </CardBody>
                </Card>
                   </div>
                   <div className=' flex flex-col w-96 2xl:w-[400px]'>
                   <Card  isHoverable={true} className='bg-white h-60 2xl:h-72 flex items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='font-medium text-md 2xl:text-md text-zinc-600'>Top Productos Mas comprados</p>
                        </div>
                        <div className='flex items-center justify-center'>
                        {productsMoreBought.length !== 0 ? 
                            <div className='flex flex-col items-start justify-start text-start mt-8 '>
                              {productsMoreBought.map((p) => ( 
                                <ul className='flex gap-2 mt-2'>
                                    <img src={start} className='w-6 h-6'/>
                                    <li className='font-medium text-sm text-zinc-600' >{p.nombreProducto} - {p.cantidadComprada} Unidades</li>
                                </ul>
                               ))} 
                            </div>
                            :
                            <p  className='font-bold text-sm' style={{color:'#728EC3'}}>Cargando..</p>
                            }
                        </div>
                    </CardBody>
                </Card>
                   </div>
                   <div className=' flex  flex-col w-96 2xl:w-[400px]'>
                   <Card  isHoverable={true} className='bg-white h-60 2xl:h-72 flex items-center justify-center' style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)"}}>
                    <CardBody >
                        <div className='flex items-center justify-start gap-2'>
                            <img src={arrowDash} className='h-2 object-fit-contain w-2'/>
                            <p className='font-medium text-zinc-600 text-xs 2xl:text-sm'>Productos Que Dieron Mayor Ganancia Neta</p>
                        </div>
                        <div className='flex items-center justify-center'>
                          {productsWithMoreNetGains.length !== 0 ? 
                             <div className='flex flex-col items-start justify-start text-start mt-8 '>
                                {productsWithMoreNetGains.map((p) => ( 
                                     <ul className='flex gap-2 mt-2'>
                                     <li className='font-bold text-sm' style={{color:'#728EC3'}}>{p.productName} - {formatePrice(p.netGain)}  </li>
                                 </ul>
                                ))}
                             </div>
                             :
                             <p  className='font-bold text-sm' style={{color:'#728EC3'}}>Cargando..</p>
                          }
                        </div>
                    </CardBody>
                </Card>
                   </div>
               </div>
         </div>
    </div>
  )
}

export default OtraPrueba
