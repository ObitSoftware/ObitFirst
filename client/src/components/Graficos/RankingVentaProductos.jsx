import { Tooltip } from 'flowbite'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from "axios"

const RankingVentaProductos = ({width, height}) => {

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
    <div className='flex items-center justify-center flex-grow '>
    <ResponsiveContainer width="100%" height="100%" aspect={4} className="max-h-fit-contain- max-w-fit-contain">
    <BarChart data={rankingProductos}>
      <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="NombreProducto" />
        <YAxis type="number"  domain={[0, 3]} ticks={[0, 5, 15]} className='text-sm' />
        <Tooltip />
        <Legend />
        <Bar dataKey="CantidadVendida" fill="#728EC3" />
    </BarChart>
    </ResponsiveContainer>
</div>
  )
}

export default RankingVentaProductos
