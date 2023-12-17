import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import { getTotalInvertedAmount, getTotalInvertedMonth, getTopCompras, quantityPurchaseOfAllCategorys, getQuantityPurchaseEver } from './FunctionsGetDataOfPurchase';
import iconProduct from "../../img/productsIcon.png"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import QuantityCategoryProductsPurchase from '../Graficos/QuantityCategoryProductsPurchase';
import { getQuantityProductsCategory } from '../DashboardProducts/FunctionsGetDataOfProducts';




const PurchaseSidebarDetail = () => {

    const [totalInvertedAmount, setTotalInvertedAmount] = useState("")
    const [invertedMonthAmount, setInvertedMonthAmount] = useState("")
    const [topFivePurchase, setTopFivePurchase] = useState([])
    const [quantityPurchaseEver, setQuantityPurchaseEver] = useState([])

    useEffect(() => { 
       const getTotal = async () => { 
        try {
            const total = await getTotalInvertedAmount()
            setTotalInvertedAmount(total)
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
           setInvertedMonthAmount(total)
       } catch (error) {
           console.error(error);
       }
      }
      getTotalMonth()
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

 




  
  return (

    <> 
    <div className='flex flex-col items-center justify-center ml-24 mt-24 2xl:mt-20 3xl:mt-0 2xl:ml-20 3xl:ml-2' onClick={() => getQuantityPurchaseEver()}>
        <div class="grid grid-cols-3 gap-4 mt-8">
          <div class="col-span-3 flex gap-4 2xl:gap-8 3xl:gap-12">
              <div class="w-full">
                  <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center w-96'>
                      <CardBody className='flex flex-col'>
                      <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Monto total Invertido en Compras</p>
                        </div>   
                        <div className='flex items-center justify-center mt-6'>
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{totalInvertedAmount} ARS</p>
                        </div>               
                      </div>
                      </CardBody>
                  </Card>
              </div>
            <div class="w-full" >
                <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
                <CardBody className='flex '>
                      <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Monto total Invertido del Mes</p>
                        </div>   
                        <div className='flex items-center justify-center mt-6'>
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{invertedMonthAmount} ARS</p>
                        </div>               
                      </div>
                </CardBody>
              </Card>
            </div>
            <div class="w-full">
                <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
                  <CardBody className='flex items-center justify-center'>
                  <div className='flex flex-col'>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                           <p className='font-bold text-xs'>Porcentaje de Ganancias</p>
                        </div>   
                        <div className='flex items-center justify-center mt-6'>
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{totalInvertedAmount}</p>
                        </div>               
                      </div>
                  </CardBody>
              </Card>
            </div>
       </div>

<div class="col-span-3 grid grid-cols-4 gap-4 mt-6">
    <div class="col-span-3 ">
          <div className="col-span-2">
             <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
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
                                  <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> <b className='text-black font-medium'>Monto:</b> {top.total} ARS</p>
                            </div>
                          ))}
                        </div>               
                      </div>
                </CardBody>
            </Card>
            </div>
    </div>
    
    <div class="col-span-1 ">
            <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center w-full'>
                <CardBody>
                    lalala
                </CardBody>
            </Card>
    </div>
</div>

<div class="col-span-3 grid grid-cols-4 gap-4" onClick={() => quantityPurchaseOfAllCategorys()}>
    <div class="col-span-3 ">
    <div className="col-span-2 ">
  <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
      <CardBody>
        <div className='flex items-center justify-start'>
        <img src={iconProduct} className='h-6 object-fit w-6'/>
           <small className='font-bold text-xs'>Total de Compras por Categoria</small>
        </div>
        <div className='mt-2'>
          <QuantityCategoryProductsPurchase/>
        </div>
      </CardBody>
  </Card>
  </div>
    </div>
    <div class="col-span-1 ">
    <div className="col-span-1">
        <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'>
                <CardBody>
                  <div className='flex justify-between items-center'>
                     <small className='font-bold text-black'>Total de Compras</small>  
                     <Dropdown>
                        <DropdownTrigger>
                          <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> Selecciona Mes </p>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" >
                          <DropdownItem> Enero </DropdownItem>
                          <DropdownItem> Febrero </DropdownItem>
                          <DropdownItem> Marzo </DropdownItem>
                          <DropdownItem> Abril </DropdownItem>
                          <DropdownItem> Octubre </DropdownItem>                     
                        </DropdownMenu>
                      </Dropdown>  
                  </div>  
                  <div className='flex items-center justify-center mt-12'>
                  <p className='text-lg font-bold' style={{color:'#728EC3'}}>{quantityPurchaseEver}</p>
                  </div>
                </CardBody>
            </Card>
    </div>
    </div>
</div>
</div>
    </div>
        

    </>
   
  )
}

export default PurchaseSidebarDetail
