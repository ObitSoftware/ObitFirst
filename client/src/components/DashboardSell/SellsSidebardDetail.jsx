import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import QuantityProductSell from '../Graficos/QuantityProductSell';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';
import { getMonthGains, getAllGains, getImprovementPercentage, getTotalYearMoneyFactured, getTotalMonthMoneyFactured, bestSells} from './FunctionsGetDataOfSells';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';



const SellsSidebardDetail = () => {

  const [totalMonthGains, setTotalMonthGains] = useState(null);
  const [totalEverGains, setTotalEverGains] = useState(null);
  const [porcentage, setPorcentage] = useState(null);
  const [totalAnualFactured, setTotalAnualFactured] = useState(null);
  const [totalMonthFactured, setTotalMonthFactured] = useState(null);
  const [bestFiveSells, setBestFiveSells] = useState([]);
  const [showTotalAnualFactured, setShowTotalAnualFactured] = useState(true)
  const [showTotalMonthFactured, setShowTotalMonthFactured] = useState(false)
  const [selectedOption, setSelectedOption] = useState(" Monto total Anual Facturado ")
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const gains = await getMonthGains();
        const gainsFormated =  formatePrice(gains)
        setTotalMonthGains(gainsFormated);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 



  useEffect(() => {
    
    const getPorcentage = async () => {
      try {
        const thePorcentage = await getImprovementPercentage();

        setPorcentage(thePorcentage);
      } catch (error) {
        console.error(error);
      }
    };
    getPorcentage();
  }, []); 



  useEffect(() => {
    const getEverGains = async () => {
      try {
        const allGains = await getAllGains();
        const formatedPrice = formatePrice(allGains)
        setTotalEverGains(formatedPrice);
      } catch (error) {
        console.error(error);
      }
    };
    getEverGains();
  }, []); 



  useEffect(() => {
    const getTotalAnualFactured = async () => {
      try {
        const totalAnualFacturedAtTheMoment = await getTotalYearMoneyFactured();
        const totalFormated = formatePrice(totalAnualFacturedAtTheMoment)
        setTotalAnualFactured(totalFormated);
      } catch (error) {
        console.error(error);
      }
    };
    getTotalAnualFactured();
  }, []); 


  useEffect(() => {
    const getTotalMonthFacturedNow = async () => {
      try {
        const totalMonthFacturedAtTheMoment = await getTotalMonthMoneyFactured();
        const totalFormated = formatePrice(totalMonthFacturedAtTheMoment)
        setTotalMonthFactured(totalFormated);
      } catch (error) {
        console.error(error);
      }
    };
    getTotalMonthFacturedNow();
  }, []); 

  
  useEffect(() => {
    const getBestSells = async () => {
      try {
        const bestFive = await bestSells();
        setBestFiveSells(bestFive);
      } catch (error) {
        console.error(error);
      }
    };
    getBestSells();
  }, []); 

   
  useEffect(() => {
      console.log(bestFiveSells)
  }, [bestFiveSells]); 


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

    <> 
    <div className='flex flex-col items-center justify-center ml-24 mt-24 2xl:mt-20 3xl:mt-0 2xl:ml-20 3xl:ml-2' onClick={() => bestSells()}>
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
                            <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalMonthGains !== null ? totalMonthGains : 'Cargando...'}</p>
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
                    <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalEverGains !== null ? totalEverGains : 'Cargando...'}</p>
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
                                <li>{formatePrice(b.total)}</li>
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
                                {totalAnualFactured}
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
                            {totalMonthFactured}
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
    </div>
        

    </>
   
  )
}

export default SellsSidebardDetail
