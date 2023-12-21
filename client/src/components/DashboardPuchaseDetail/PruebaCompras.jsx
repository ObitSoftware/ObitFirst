import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import { getTotalInvertedAmount, getTotalInvertedMonth, getTopCompras, quantityPurchaseOfAllCategorys, getQuantityPurchaseEver, getPorcentage, getQuantityPurchaseByMonth } from './FunctionsGetDataOfPurchase';
import iconProduct from "../../img/productsIcon.png"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import QuantityCategoryProductsPurchase from '../Graficos/QuantityCategoryProductsPurchase';
import { getQuantityProductsCategory } from '../DashboardProducts/FunctionsGetDataOfProducts';
import { formatePrice } from '../../functions/formatPrice';
import axios from 'axios';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"
import VentasPorMes from '../Graficos/VentasPorMes';
import purchaseIcon from "../../img/purchaseIcon.png"

const PruebaCompras = () => {

    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState([])
 
   useEffect(() => { 
     axios.get(`http://localhost:3000/productos/${productId}`)
          .then((res) => { 
           console.log("EL PRODUCTO: ", res.data)
          })
          .catch((err) => { 
           console.log(err)
          })
   }, [productId])
 
   useEffect(() => { 
     axios.get(`http://localhost:3000/productos`)
          .then((res) => { 
           setProducts(res.data)
          })
          .catch((err) => { 
           console.log(err)
          })
   }, [])
 
     const [totalInvertedAmount, setTotalInvertedAmount] = useState("")
     const [invertedMonthAmount, setInvertedMonthAmount] = useState("")
     const [topFivePurchase, setTopFivePurchase] = useState([])
     const [quantityPurchaseEver, setQuantityPurchaseEver] = useState([])
     const [quantityPurchaseMonth, setQuantityPurchaseMonth] = useState([])
     const [showEverPurchase, setShowEverPurchase] = useState(true)
     const [porcentage, setPorcentage] = useState("")
     const [monthSelected, setMonthSelected] = useState("")
 
         useEffect(() => { 
           const getTotal = async () => { 
             try {
                 const total = await getTotalInvertedAmount()
                 const formatedTotal = formatePrice(total)
                 setTotalInvertedAmount(formatedTotal)
             } catch (error) {
                 console.error(error);
             }
           }
           getTotal()
         }, [])
 
         useEffect(() => { 
           const getTotalMonth = async () => { 
           try {
               const total = await getTotalInvertedMonth()
               const formatedTotal = formatePrice(total)
               setInvertedMonthAmount(formatedTotal)
           } catch (error) {
               console.error(error);
           }
           }
           getTotalMonth()
       }, [])
 
       
         useEffect(() => { 
         const getPorcentageGains = async () => { 
         try {
             const porcentage = await getPorcentage()
             setPorcentage(porcentage)
         } catch (error) {
             console.error(error);
         }
         }
         getPorcentageGains()
         }, [])
 
 
           useEffect(() => { 
             const getTopFive = async () => { 
             try {
                 const top = await getTopCompras()
                 setTopFivePurchase(top)
             } catch (error) {
                 console.error(error);
             }
             }
             getTopFive()
         }, [])
 
         useEffect(() => { 
           const getQuantityEver = async () => { 
           try {
               const quantity = await getQuantityPurchaseEver()
               setQuantityPurchaseEver(quantity)
           } catch (error) {
               console.error(error);
           }
           }
           getQuantityEver()
         }, [])
 
       
 
     useEffect(() => { 
       const getQuantityMonth = async () => { 
       try {
           const quantityMonth = await getQuantityPurchaseByMonth(monthSelected)
           setQuantityPurchaseMonth(quantityMonth)
           if(monthSelected === "") { 
             setShowEverPurchase(true)
           } else { 
             setShowEverPurchase(false)
           }
       } catch (error) {
           console.error(error);
       }
       }
       getQuantityMonth()
     }, [monthSelected])
 
     
     useEffect(() => { 
     console.log(productId)
     }, [productId])
    

  return (
    <div className='flex flex-col  text-center items-center justify-center ml-44 mt-24 2xl:mt-2'>
    <div class="grid grid-cols-3 gap-4 ">
       <div class="col-span-2">
           <div className='flex gap-4'>
                 <div className='w-4/5 '>
                     <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                         <CardBody>
                            <div className='flex items-center justify-start'>
                                <p className='font-bold text-xs'>Historial de Compras por Producto</p>
                            </div>
                                <VentasPorMes/>
                         </CardBody>
                     </Card>
                 </div>
                 <div className='w-1/5 '>
                     <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                         <CardBody>
                            <div className='flex flex-col justify-between items-center'>
                                           <div className='flex items-center cursor-pointer'> 
                                                <img src={arrowDash} className='h-2 w-2 mr-2'/> 
                                                <small className='text-zinc-600  font-medium font-inter text-sm'>Cantidad total de compras</small> 
                                            </div>  
                                 <Dropdown>
                                    <DropdownTrigger>
                                        <div className='flex gap-2 items-center mt-4'>
                                           <small  className="text-xs font-bold" >Dic</small> 
                                           <small  className="text-xs font-bold" >2023</small> 
                                        </div>                                      
                                    </DropdownTrigger>
                                         <DropdownMenu aria-label="Dynamic Actions" className='max-h-[250px] overflow-y-auto'>
                                            <DropdownItem onClick={() => setMonthSelected("enero")}> Enero </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("febrero")}> Febrero </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("marzo")}> Marzo </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("abril")}> Abril </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("mayo")}> Mayo </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("junio")}> Junio</DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("julio")}> Julio </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("agosto")}> Agosto </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("septiembre")}> Septiembre </DropdownItem>
                                            <DropdownItem onClick={() => setMonthSelected("octubre")}> Octubre </DropdownItem>  
                                            <DropdownItem onClick={() => setMonthSelected("noviembre")}> Noviembre </DropdownItem>           
                                            <DropdownItem onClick={() => setMonthSelected("diciembre")}> Diciembre </DropdownItem>           
                                         </DropdownMenu>
                                 </Dropdown>  
                              </div>  
                       <div className='flex items-center justify-center mt-8'>
                            <div className='flex flex-col items-center justify-center'>
                               {showEverPurchase ? 
                               <>
                                <p style={{color:"#305C9F "}} className='text-center text-xl font-medium font-inter'> {quantityPurchaseEver} </p> 
                                <img src={purchaseIcon} className='w-14 h-14 2xl:w-16 2xl:h-16 mt-6'/>
                               </>                              
                                : 
                                <>
                                <p style={{color:"#305C9F "}} className='text-center  text-xl font-medium font-inter'> {quantityPurchaseMonth} </p> 
                                <img src={purchaseIcon} className='w-14 h-14 2xl:w-16 2xl:h-16 mt-6'/>
                               </>  
                               }
                            </div>
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
                                <div className='flex flex-col'>
                                    <div className='flex items-center justify-start '>
                                         <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                         <p className='text-xs ml-2'>Monto total Invertido en Compras</p>
                                    </div>   
                                    <div className='flex items-center justify-center mt-6'>
                                    <p className='text-xl font-bold'  style={{color:"#728EC3"}}>{totalInvertedAmount} </p>
                                    </div>               
                                </div>
                           </CardBody>
                     </Card>
                 </div>
                 <div className='mt-2 w-full'>
                     <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                         <CardBody className='flex '>
                                <div className='flex flex-col'>
                                    <div className='flex items-center justify-start '>
                                        <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                        <p className='text-xs ml-2'>Invesion total de Compras en el mes</p>
                                    </div>   
                                    <div className='flex items-center justify-center mt-6'>
                                    <p className='text-xl font-bold'  style={{color:"#728EC3"}}>{invertedMonthAmount} </p>
                                    </div>               
                                </div>
                         </CardBody>
                     </Card>
                 </div>
                   <div className='mt-2 w-full'>
                        <Card isHoverable={true} className=' bg-white h-24 rounded-xl flex items-center justify-center w-60 2xl:w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>
                           <CardBody className="flex">
                                <div className='flex flex-col'>
                                    <div className='flex items-center justify-start '>
                                         <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                         <p className='text-xs ml-2'>Porcentaje de Retorno de Inversión</p>
                                    </div>   
                                    <div className='flex items-center justify-center mt-6'>
                                    <p className='text-xl font-bold' style={{color:"#56CB69"}}>+ {porcentage} % </p>
                                    </div>               
                                </div>
                             </CardBody>
                          </Card>
                    </div>
               </div>
           </div>
           <div className=' w-9/12 2xl:w-9/12 ml-0 2xl:ml-2 '>
               <Card isHoverable={true} className='bg-white h-full flex items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                   <CardBody>
                            <div className='flex items-center justify-start gap-2'>
                                <p className='text-zinc-600  font-medium font-inter text-lg'>Ventas por Categoria</p>
                            </div>
                            <div className='flex items-center justify-center mt-4  h-full w-auto'>                          
                              <QuantityCategoryProductsPurchase/>                            
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
                            <div className='flex flex-col'>
                                <div className='flex items-center justify-start gap-2 mt-2'>
                                    <img src={arrowDash} className='h-2 object-fit w-2'/>
                                    <p className='font-medium text-zinc-600 font-inter text-sm'>TOP COMPRAS A PROVEEDORES</p>
                                </div> 
                                  <div className='flex flex-col items-center justify-center mt-8'>
                                     <div className='flex flex-col'>
                                        {topFivePurchase.map((top) => ( 
                                               <div className=' flex flex-col items-start mt-4'>
                                               <div className='flex'>
                                                 <img src={start} className='h-4 w-4 object-fit-contain'/>
                                                    {top.productosComprados.map((t) => (         
                                                        <div className='flex flex-col'> 
                                                            <div className='flex flex-col items-center '>
                                                               <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> {t.proveedor} </p> 
                                                               <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> {t.nombreProducto} </p>  
                                                            </div>                                                                                                               
                                                        </div>                                                                                                                                   
                                                     ))}
                                               </div>
                                               <div className='flex flex-col mt-4 ml-4'>
                                               <p className='text-lg font-bold mt-2' style={{color:"#4C83EA"}}> {formatePrice(top.total)} </p>
                                               </div>                            
                                             </div>  
                                        ))}
                                     </div>
                               
                                  </div>               
                            </div>
                       </CardBody>
                   </Card>
       </div>

    </div>
</div>


  )
}

export default PruebaCompras




/*


  return (
    <div className='flex flex-col  text-center items-center justify-center ml-44 mt-24 2xl:mt-2'>
    <div class="grid grid-cols-3 gap-4 ">
       <div class="col-span-2">
           <div className='flex gap-4'>
                 <div className='w-4/5 '>
                 <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center w-full'>
                <CardBody>
                    <div className='flex items-center justify-start'>
                        <p className='font-bold text-xs'>Historial de Compras por Producto</p>
                    </div>
                    <p>a</p>
                </CardBody>
            </Card>
                 </div>
                 <div className='w-1/5 '>
                     <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                         <CardBody>
                         <div className='flex justify-between items-center'>
                     <small className='font-bold text-black'>Total de Compras</small>  
                     <Dropdown>
                        <DropdownTrigger>
                       {showEverPurchase ? <small  className="text-xs font-bold" >Selecciona el mes</small> :  <small  className="text-xs font-bold" >{monthSelected}</small> }
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" className='max-h-[250px] overflow-y-auto'>
                          <DropdownItem onClick={() => setMonthSelected("enero")}> Enero </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("febrero")}> Febrero </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("marzo")}> Marzo </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("abril")}> Abril </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("mayo")}> Mayo </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("junio")}> Junio</DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("julio")}> Julio </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("agosto")}> Agosto </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("septiembre")}> Septiembre </DropdownItem>
                          <DropdownItem onClick={() => setMonthSelected("octubre")}> Octubre </DropdownItem>  
                          <DropdownItem onClick={() => setMonthSelected("noviembre")}> Noviembre </DropdownItem>           
                          <DropdownItem onClick={() => setMonthSelected("diciembre")}> Diciembre </DropdownItem>           
                        </DropdownMenu>
                      </Dropdown>  
                  </div>  
                  <div className='flex items-center justify-center mt-12'>
                  <div
                            style={{ 
                              width: '150px', 
                              height: '150px',
                              borderRadius: '60%',
                              backgroundColor: '#728EC3', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px', 
                              fontWeight: 'bold',
                              color:"black"
                            }}
                           >
                           {showEverPurchase ? <p className='text-xl'> {quantityPurchaseEver} </p> : <p className='text-xl'> {quantityPurchaseMonth} </p>}
                            </div>
                  </div>
                                          
                         </CardBody>
                     </Card>
                 </div>
           </div>
       </div>

       <div class="col-span-2 "> 
         <div className='flex '>
             <div className='w-2/5 xl:w-4/12'>
               <div className='flex flex-col items-center justify-center'>
                  <div className='mt-2 w-full'>
                     <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-72'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                         <CardBody className='flex '>              
                         <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Monto total Invertido en Compras</p>
                        </div>   
                        <div className='flex items-center justify-center mt-6'>
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{totalInvertedAmount} </p>
                        </div>               
                      </div>
                           </CardBody>
                     </Card>
                 </div>
                 <div className='mt-2 w-full'>
                     <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-60 2xl:w-72'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>                      
                         <CardBody className='flex '>
                         <div className='flex flex-col'>
                                <div className='flex items-center justify-start gap-2'>
                                    <img src={iconProduct} className='h-6 object-fit w-6'/>
                                <p className='font-bold text-xs'>Monto total Invertido en compras del Mes</p>
                                </div>   
                                <div className='flex items-center justify-center mt-6'>
                                <p className='text-md font-bold'style={{color:'#728EC3'}}>{invertedMonthAmount} </p>
                                </div>               
                            </div>
                         </CardBody>
                     </Card>
                 </div>
                   <div className='mt-2 w-full'>
                      <Card isHoverable={true} className=' bg-white h-24 rounded-xl flex items-center justify-center w-60 2xl:w-72'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>
                           <CardBody className="flex">
                           <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Porcentaje de retorno de Inversion </p>
                        </div>   
                        <div className='flex items-center justify-center mt-6'>
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>+ {porcentage} %</p>
                        </div>               
                      </div>
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
                              <QuantityCategoryProductsPurchase/>                            
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
                       <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Top Compras a Proveedores</p>
                        </div>   
                        <div className='flex flex-col items-center justify-center mt-6'>
                        {topFivePurchase.map((top) => ( 
                            <div className='flex  items-center justify-center mt-4'>
                               {top.productosComprados.map((t) => (  
                                <>
                                   <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}>{t.cantidad} {t.nombreProducto} / </p> 
                                </>                                                    
                               ))}
                               <p className='text-xs  ml-2 text-black font-medium' >Proveedores: </p>
                                {top.productosComprados.map((t) => (                                                              
                                 <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> {t.proveedor} </p>                           
                               ))}
                                  <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> / </p>
                                  <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> <b className='text-black font-medium'>Monto:</b> {formatePrice(top.total)} </p>
                            </div>
                          ))}
                        </div>               
                      </div>
                       </CardBody>
                   </Card>
       </div>

    </div>
</div>

  )
}

export default PruebaCompras
*/
