import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import { quantityOfProducts, calcularMontoTotal, getQuantityProductsCategory, topMoreBoughtProducts, topProductsWithMoreNetGains } from './FunctionsGetDataOfProducts';
import  HistoricGainsProduct  from '../Graficos/HistoricGainsProduct';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import VentasPorMes from '../Graficos/VentasPorMes';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";




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
               setTotalMoneyInverted(total)
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
        <div className='flex gap-12 items-center justify-center' onClick={() => topProductsWithMoreNetGains()}>

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
                            <p className='font-bold text-sm' style={{color:'#728EC3', }}> {totalMoneyInverted} ARS</p>
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

        <div className='flex gap-12 items-center justify-center mt-12'>
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
                                     <li className='font-bold text-sm' style={{color:'#728EC3'}}>{p.productName} - {p.netGain} ARS</li>
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

        <div className='flex gap-12 items-center justify-center mt-12'>
            <div className='w-[850px] '>
            <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
                    <CardBody>
                    <div className='flex items-start justify-between'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Historial de Venta por producto Mensual</p>
                        </div>   
                        <div className='flex items-center justify-end'>
                        <Dropdown >
                            <DropdownTrigger>
                               {monthSelected === "" ? <small  className="text-xs font-bold" >Selecciona el mes</small> : <small  className="text-xs font-bold" >{monthSelected}</small>}
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" className='max-h-96 overflow-y-auto'  onAction={(key) => alert(key)}>
                                <DropdownItem key="new" onClick={() => setMonthSelected("enero")}>Enero</DropdownItem>
                                <DropdownItem key="copy">Febrero</DropdownItem>
                                <DropdownItem key="edit">Marzo</DropdownItem>
                                <DropdownItem key="edit">Abril</DropdownItem>
                                <DropdownItem key="edit">Mayo</DropdownItem>
                                <DropdownItem key="edit">Junio</DropdownItem>
                                <DropdownItem key="edit">Julio</DropdownItem>
                                <DropdownItem key="edit">Agosto</DropdownItem>
                                <DropdownItem key="edit">Septiembre</DropdownItem>
                                <DropdownItem key="edit"  onClick={() => setMonthSelected("octubre")}>Octubre</DropdownItem>
                                <DropdownItem key="edit"  onClick={() => setMonthSelected("noviembre")}>Noviembre</DropdownItem>
                                <DropdownItem key="edit"  onClick={() => setMonthSelected("diciembre")}>Diciembre</DropdownItem>
                     
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

/*  <div className='flex flex-col items-center justify-center ml-24 mt-24 2xl:mt-20 3xl:mt-0 2xl:ml-20 3xl:ml-2' onClick={() => bestSells()}>
        <div class="grid grid-cols-3 gap-4 mt-8">
          <div class="col-span-3 flex gap-4 2xl:gap-8 3xl:gap-12">
              <div class="w-full">
                  <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center w-96'>
                      <CardBody className='flex'>
                        <div className='flex flex-col '>
                          <div className='flex w-full justify-between'>
                            <div className='flex items-start justify-start gap-2'>
                              <img src={iconProduct} className='h-6 object-fit w-6'/>
                              <p>Ganancias Neta Mensual</p>   
                            </div>
                            <div className='flex items-end justify-end'>
                              <b >{monthName}</b>
                            </div>
                          </div>
                          <div className='flex items-center justify-center mt-4'>
                            <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalMonthGains !== null ? totalMonthGains + " ARS" : 'Cargando...'}</p>
                          </div>
                        </div>
                        <div>
                        </div>
                      </CardBody>
                  </Card>
              </div>
            <div class="w-full" >
                <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
                <CardBody className='flex '>
                
                  <div className='flex flex-col '>
                    <div className='flex w-full justify-between'>
                      <div className='flex items-start justify-start gap-2'>
                        <img src={iconProduct} className='h-6 object-fit w-6'/>
                        <p> Ganancias Neta Anual</p>   
                      </div>
                      <div className='flex items-end justify-end'>
                        <b >{actualYear}</b>
                      </div>
                    </div>
                    <div className='flex items-center justify-center mt-4'>
                    <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalEverGains !== null ? totalEverGains + " ARS" : 'Cargando...'}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div class="w-full">
                <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
                  <CardBody className='flex items-center justify-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <img src={iconProduct} className='h-6 object-fit w-6'/>
                      <p className='font-bold text-xs'>Porcentaje de Crecimiento en comparacion al mes pasado</p>
                    </div>
                   {porcentage === null ? 
                     <div className='mt-6'>
                         <p className='font-bold' style={{color:"#728EC3"}}>Cargando</p>
                     </div>
                          :
                      <div className='flex items-center justify-center mt-4'>
                          <p className='font-bold' style={{color:"#728EC3"}}>+ {porcentage} %</p>
                        </div>
                      }
                  </CardBody>
              </Card>
            </div>
       </div>

<div class="col-span-3 grid grid-cols-4 gap-4 mt-6">
    <div class="col-span-3 ">
          <div className="col-span-2">
             <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                <CardBody>
                    <div className='flex items-start justify-start gap-2'>
                        <img src={iconProduct} className='h-6 object-fit w-6'/>
                        <p className='font-bold text-xs'>Ventas por Categoria</p>
                    </div>
                    <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                      <QuantityProductSell/>                            
                    </div>
                </CardBody>
            </Card>
            </div>
    </div>
    
    <div class="col-span-1 ">
            <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center w-full'>
                <CardBody>
                    <div className='flex items-center justify-start gap-2'>
                        <img src={iconProduct} className='h-6 object-fit w-6'/>
                        <p className='font-bold text-xs'>Top 5 Ventas</p>
                    </div>
                 {bestFiveSells.length !== 0 ?
                    <div className='flex flex-col items-start justify-start text-start mt-8 '>
                        {bestFiveSells.map((b, index) => (                        
                            <ul className='flex justify-start items-start text-start gap-2 mt-2 text-xs font-bold' key={index}  style={{color:"#728EC3"}}>
                                <li>{b.nombreProducto}</li>
                                <li>{b.nombreCliente}</li>
                                <li>{b.total}$</li>
                            </ul>                                            
                        ))}
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

<div class="col-span-3 grid grid-cols-4 gap-4">
    <div class="col-span-3 ">
    <div className="col-span-2 ">
  <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
      <CardBody>
      <div className='flex items-start justify-start gap-2'>
          <img src={iconProduct} className='h-6 object-fit w-6'/>
          <p className='font-bold text-xs'>Ventas Mensuales</p>
      </div>
      <div className='flex items-center justify-center flex-grow mt-4'>
          <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                      <VentasPorMes/>                            
           </div>
      </div>
      </CardBody>
  </Card>
  </div>
    </div>
    <div class="col-span-1 ">
    <div className="col-span-1">
        <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'>
                <CardBody>
                    <div className='flex items-start justify-start gap-2'>
                        <img src={iconProduct} className='h-6 object-fit w-6'/>
                        <Dropdown>
                            <DropdownTrigger>
                              <small className='text-xs font-bold'>{selectedOption} <b className='text-sm'>↓</b> </small>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions">
                               <DropdownItem onClick={() => { handleClick('Monto total Anual Facturado'); showOneData(true, false); }}> Monto total Anual Facturado </DropdownItem> 
                               <DropdownItem onClick={() => { handleClick('Monto total Mensual Facturado'); showOneData(false, true); }}> Monto total Mensual Facturado</DropdownItem> 
                            </DropdownMenu>
                          </Dropdown>
                    </div>
                    <div className='flex items-center justify-center mt-12'>
                            {showTotalAnualFactured ?                                    
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
                                {totalAnualFactured} ARS
                            </div>
                             : 
                             null}

                            {showTotalMonthFactured ? 
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
                            {totalMonthFactured} ARS
                            </div>
                             : 
                             null}
                    </div>

                   
                </CardBody>
            </Card>
    </div>
    </div>
</div>
</div>
    </div>*/