import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import { quantityOfProducts, calcularMontoTotal, getQuantityProductsCategory } from './FunctionsGetDataOfProducts';
import  HistoricGainsProduct  from '../Graficos/HistoricGainsProduct';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import VentasPorMes from '../Graficos/VentasPorMes';




const ProductsSidebarDetail = () => { 

    const [totalQuantityProducts, setTotalQuantityProducts] = useState(null)
    const [totalMoneyInverted, setTotalMoneyInverted] = useState(null)
    const [quantityProductsOfCategory, setQuantityProductsOfCategory] = useState([])

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
         console.log(quantityProductsOfCategory)
     }, [quantityProductsOfCategory])

  return (
    <div className='flex flex-col items-center justify-center max-w-[800px]'>

        <div className='flex gap-12 items-center justify-center' onClick={() => getQuantityProductsCategory()}>
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
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>TOP PRODS + COMPRADOS, RANK LISTADO COMO IMAGEN</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody >
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>TOP PRODUCTOS QUE MAS GANANCIAS GENERARON.RANKING LIST</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
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
                           <p className='text-xs'>Selecciona el Mes </p>
                        </div>               
                    </div>
                    <div className='flex items-center justify-center flex-grow mt-4'>
                        <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                                    <RankingVentaProductos/>                            
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
