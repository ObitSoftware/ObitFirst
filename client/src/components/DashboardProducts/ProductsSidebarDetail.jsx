import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import { quantityOfProducts, calcularMontoTotal, getQuantityProductsCategory, topMoreBoughtProducts, topProductsWithMoreNetGains } from './FunctionsGetDataOfProducts';
import  HistoricGainsProduct  from '../Graficos/HistoricGainsProduct';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import VentasPorMes from '../Graficos/VentasPorMes';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';




const ProductsSidebarDetail = () => { 

    const [totalQuantityProducts, setTotalQuantityProducts] = useState(null)
    const [totalMoneyInverted, setTotalMoneyInverted] = useState(null)
    const [quantityProductsOfCategory, setQuantityProductsOfCategory] = useState([])
    const [productsMoreBought, setProductsMoreBought] = useState([])
    const [productsWithMoreNetGains, setProductsWithMoreNetGains] = useState([])
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
    <div className='flex flex-col items-center justify-center ml-24 mt-24 2xl:mt-20 3xl:mt-0 2xl:ml-20 3xl:ml-2'>
        <div className='flex gap-4 2xl:gap-12 items-center justify-center' onClick={() => topProductsWithMoreNetGains()}>
            <div className='w-[400px] '>
                <Card isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Cantidad de Productos Disponibles</p>
                        </div>
                        <div className='flex items-center justify-center mt-2'>
                        <div
                            style={{ 
                              width: '40px', 
                              height: '40px',
                              borderRadius: '60%',
                              backgroundColor: '#728EC3', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px', 
                              fontWeight: 'bold',
                              color:"black"
                            }}
                           >
                            {totalQuantityProducts} 
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Total Invertido de Stock Actual</p>
                        </div>
                        <div className='flex items-center justify-center mt-6'>
                            <p className='font-bold text-sm' style={{color:'#728EC3', }}> {totalMoneyInverted} </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>A DEFINIR</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>

        <div className='flex gap-4 2xl:gap-12 items-center justify-center mt-12'>
            <div className='w-[400px] '>
                <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Cantidad de Productos por Categoria</p>
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
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Top Productos Mas comprados</p>
                        </div>
                        <div className='flex items-center justify-center'>
                        {productsMoreBought.length !== 0 ? 
                            <div className='flex flex-col items-start justify-start text-start mt-8 '>
                              {productsMoreBought.map((p) => ( 
                                <ul className='flex gap-2 mt-2'>
                                    <li className='font-bold text-sm' style={{color:'#728EC3'}}>{p.nombreProducto} - {p.cantidadComprada} Unidades</li>
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
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody >
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Productos Que Dieron Mayor Ganancia Neta</p>
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

        <div className='flex gap-4 2xl:gap-12 items-center justify-center mt-12'>
            <div className='w-[850px] '>
            <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
                    <CardBody>
                    <div className='flex items-start justify-between'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           {monthSelected === "" ? <p className='font-bold text-xs'>Historial de Ventas Historico</p> : <p className='font-bold text-xs'>Historial de Venta por producto del mes de {monthSelected}</p>}
                        </div>   
                        <div className='flex items-center justify-end'>
                        <Dropdown >
                            <DropdownTrigger>
                               {monthSelected === "" ? <small  className="text-xs font-bold" >Selecciona el mes</small> : <small  className="text-xs font-bold" >{monthSelected}</small>}
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
          
            <div className='w-[400px] '>
                <Card className='bg-white h-64 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Sin Definir</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>


       
    </div>
  )
}

export default ProductsSidebarDetail

