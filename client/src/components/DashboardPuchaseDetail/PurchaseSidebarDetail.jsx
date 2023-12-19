import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import { getTotalInvertedAmount, getTotalInvertedMonth, getTopCompras, quantityPurchaseOfAllCategorys, getQuantityPurchaseEver, getPorcentage, getQuantityPurchaseByMonth } from './FunctionsGetDataOfPurchase';
import iconProduct from "../../img/productsIcon.png"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import QuantityCategoryProductsPurchase from '../Graficos/QuantityCategoryProductsPurchase';
import { getQuantityProductsCategory } from '../DashboardProducts/FunctionsGetDataOfProducts';
import { formatePrice } from '../../functions/formatPrice';
import axios from 'axios';




const PurchaseSidebarDetail = () => {

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
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{totalInvertedAmount} </p>
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
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>{invertedMonthAmount} </p>
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
                          <p className='text-md font-bold'style={{color:'#728EC3'}}>+ {porcentage} %</p>
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
                                  <p className='text-xs font-medium ml-2' style={{color:'#728EC3'}}> <b className='text-black font-medium'>Monto:</b> {formatePrice(top.total)} </p>
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
                    <div className='flex items-center justify-start'>
                        <p className='font-bold text-xs'>Historial de Compras por Producto</p>
                    </div>
                    <div className='mt-6 text-center justify-center flex'>
                    <Dropdown>
                      <DropdownTrigger>
                        <small className="text-xs font-bold">Selecciona el Producto</small>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions" className='max-h-[250px] overflow-y-auto'>
                        {products.map((p) => (
                          <DropdownItem key={p._id} onClick={() => setProductId(p._id)}>
                            {p.nombre}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                  </Dropdown>
                    </div>
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
</div>
    </div>
        

    </>
   
  )
}

export default PurchaseSidebarDetail
