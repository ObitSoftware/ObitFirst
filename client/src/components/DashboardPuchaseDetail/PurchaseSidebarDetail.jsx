import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import { getTotalInvertedAmount, getTotalInvertedMonth } from './FunctionsGetDataOfPurchase';
import iconProduct from "../../img/productsIcon.png"




const PurchaseSidebarDetail = () => {

    const [totalInvertedAmount, setTotalInvertedAmount] = useState("")
    const [invertedMonthAmount, setInvertedMonthAmount] = useState("")

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




  
  return (

    <> 
    <div className='flex flex-col items-center justify-center ml-24 mt-24 2xl:mt-20 3xl:mt-0 2xl:ml-20 3xl:ml-2' onClick={() => getTotalInvertedMonth()}>
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
                 lalala
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

<div class="col-span-3 grid grid-cols-4 gap-4">
    <div class="col-span-3 ">
    <div className="col-span-2 ">
  <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
      <CardBody>
      lalala
      </CardBody>
  </Card>
  </div>
    </div>
    <div class="col-span-1 ">
    <div className="col-span-1">
        <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'>
                <CardBody>
                  lalala
                   
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
