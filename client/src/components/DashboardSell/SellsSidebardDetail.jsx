import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import Pastel from '../Graficos/Pastel';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';

const SellsSidebardDetail = () => {

    const [rankingProductos, setRankingProductos] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/venta")
          .then((res) => {
            const productosVendidos = res.data.reduce((acc, venta) => {
              const nombreProducto = venta.nombreProducto;
              const cantidadVendida = venta.cantidad || 0; // Utilizar la propiedad correcta
    
              const index = acc.findIndex((producto) => producto.NombreProducto === nombreProducto);
    
              if (index !== -1) {
                acc[index].CantidadVendida += cantidadVendida;
              } else {
                acc.push({
                  NombreProducto: nombreProducto,
                  CantidadVendida: cantidadVendida
                });
              }
    
              return acc;
            }, []);
    
            productosVendidos.sort((a, b) => b.CantidadVendida - a.CantidadVendida);
    
            setRankingProductos(productosVendidos);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

  useEffect(() => { 
   console.log(rankingProductos)
  }, [rankingProductos])


  
  return (

    <>

    <div className='flex items-start justify-start'>
        <p className='text-sm font-bold underline'>Ventas</p>
    </div>
    
    <div className="grid grid-cols-3  w-full mt-12">
    <div className='flex gap-28 col-span-3 justify-center items-center'>
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2'>
            <img src={iconProduct} className='h-6 object-fit w-6'/>
            <p className='font-bold text-xs'>Total de Ganancias</p>
          </div>
        </CardBody>
      </Card>
      <div className="col-span-1">
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2'>
            <img src={iconProduct} className='h-6 object-fit w-6'/>
            <p className='font-bold text-xs'>Cantidad de Clientes</p>
          </div>
        </CardBody>
      </Card>
      </div>
      <div className="col-span-1">
      <Card isHoverable={true} className='col-span-1 bg-white h-24 flex items-center justify-center  w-96'>
        <CardBody className='flex items-center justify-center'>
          <div className='flex items-center justify-center gap-2'>
            <img src={iconProduct} className='h-6 object-fit w-6'/>
            <p className='font-bold text-xs'>Cantidad de Compras del Mes</p>
          </div>
        </CardBody>
      </Card>
      </div>
    </div>
  
    <div className="col-span-3 justify-center items-center mt-12">
      <div className='flex gap-28 col-span-3 justify-center items-center'>
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
