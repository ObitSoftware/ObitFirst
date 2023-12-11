import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import Pastel from '../Graficos/Pastel';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';
import { getMonthGains, getAllGains, getPercentage } from './FunctionsGetDataOfSells';


const SellsSidebardDetail = () => {

  const [totalMonthGains, setTotalMonthGains] = useState(null);
  const [totalEverGains, setTotalEverGains] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gains = await getMonthGains();
        setTotalMonthGains(gains);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    
    const getEverGains = async () => {
      try {
        const allGains = await getAllGains();
        setTotalEverGains(allGains);
      } catch (error) {
        console.error(error);
      }
    };
    getEverGains();
  }, []); 


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

    <div className='flex items-start justify-start'>
        <p className='text-sm font-bold underline'>Ventas</p>
    </div>
    
    <div className="grid grid-cols-3 w-full mt-12">
    <div className='flex gap-12 col-span-3 justify-center items-center'>
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex gap-2'>
              <img src={iconProduct} className='h-6 object-fit w-6'/>
               Ganancias Mensuales - {monthName}
            </div>
            <div>
              <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalMonthGains !== null ? totalMonthGains + " ARS" : 'Cargando...'}</p>
            </div>
          </div>
          <div>
           
          </div>
        </CardBody>
      </Card>
      <div className="col-span-1">
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex gap-2'>
              <img src={iconProduct} className='h-6 object-fit w-6'/>
               Ganancias Totales - {actualYear}
            </div>
            <div>
              <p className='text-sm font-bold' style={{color:"#728EC3"}}> {totalEverGains !== null ? totalEverGains + " ARS" : 'Cargando...'}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      </div>
      <div className="col-span-1">
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2'>
            <img src={iconProduct} className='h-6 object-fit w-6'/>
            <p className='font-bold text-xs'>Porcentaje de Crecimiento en comparacion al mes pasado</p>
          </div>
        </CardBody>
      </Card>
      </div>
    </div>
  
    <div className="col-span-3 justify-center items-center mt-12">
      <div className='flex gap-12 col-span-3 justify-center items-center'>
        <div className="col-span-1">
        <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center w-96'>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Ventas por Categoria</p>
                        </div>
                        <div className='flex items-center justify-center mt-4'>
                           <Pastel/>
                        </div>
                    </CardBody>
                </Card>
        </div>
        <div className="col-span-1">
        <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center  w-96'>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Ventas Mensuales</p>
                        </div>
                        <div className='flex items-center justify-center mt-6'>
                          <ResponsiveContainer width="100%" height="100%" aspect={4} className="max-h-fit-contain- max-w-fit-contain">
                            <VentasPorMes/>
                          </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>
        </div>
        <div className="col-span-1">
            <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center w-96'>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Top Productos menos vendidos</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
                        </div>
                    </CardBody>
                </Card>
        </div>
      </div>
    </div>
  
          <div className="col-span-2 mt-12">
            <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center'>
                <CardBody>
                <div className='flex items-start justify-start gap-2'>
                    <img src={iconProduct} className='h-6 object-fit w-6'/>
                    <p className='font-bold text-xs'>Top Productos mas Vendidos</p>
                </div>
                <div className='flex items-center justify-center flex-grow mt-4'>
                    <ResponsiveContainer width="100%" height="100%" aspect={4} className="max-h-fit-contain- max-w-fit-contain">
                       <RankingVentaProductos/>
                    </ResponsiveContainer>
                </div>
                </CardBody>
            </Card>
            </div>
  </div>
    </>
   
  )
}

export default SellsSidebardDetail
