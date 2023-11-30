import { Tooltip } from 'flowbite'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from "axios"

const RankingVentaProductos = () => {

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
       <div className='flex flex-col items-center mt-56'>
                <p className='m-8 text-md font-bold'>Productos mas Vendidos</p>
                <ResponsiveContainer minWidth={800} minHeight={100} width="100%" aspect={4} className="max-w-fit-contain border border-red-600">
                    <BarChart data={rankingProductos} width={500} height={300}>
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey="NombreProducto" />
                        <YAxis type="number"  domain={[0, 6]} ticks={[0, 1, 2, 3, 4, 5, 6]} className='text-sm' />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="CantidadVendida" fill="#728EC3" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
  )
}

export default RankingVentaProductos
