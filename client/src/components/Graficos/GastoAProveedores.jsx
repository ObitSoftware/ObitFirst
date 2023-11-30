import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const GastoAProveedores = () => {

    const [rankingGastosAProveedores, setRankingGastosAProveedores] = useState([]);

    useEffect(() => {
        // Hacer la petición GET a la ruta 'compras'
        axios.get('http://localhost:3000/compras')
          .then((res) => {

            const compras = res.data;
            const totalGastadoPorProveedor = compras.reduce((result, compra) => {
              const { productosComprados } = compra;
              productosComprados.forEach((producto) => {
                const proveedor = producto.proveedor[0];
                const totalGastado = parseFloat(producto.total);
                if (!result[proveedor]) {
                  result[proveedor] = 0;
                }  
                result[proveedor] += totalGastado;
              });  
              return result;
            }, {});
    
           
            const chartData = Object.keys(totalGastadoPorProveedor).map((proveedor) => ({
              Proveedor: proveedor,
              TotalGastado: totalGastadoPorProveedor[proveedor],
            }));
    
          
            setRankingGastosAProveedores(chartData);
            console.log(chartData)
          })
          .catch((error) => {
            console.error('Error al obtener datos de compras', error);
          });
      }, []); 
    
      return (
        <div className='flex flex-col items-center mt-56'>
                <p className='m-8 text-md font-bold'>Gastos a Proveedores</p>
                    <ResponsiveContainer minWidth={1400} minHeight={900} width="100%" aspect={4}>
                        <BarChart data={rankingGastosAProveedores} width={500} height={300}>
                            <CartesianGrid strokeDasharray="4 1 2" />
                            <XAxis dataKey="Proveedor" />
                            <YAxis type="number"  domain={[50000, 5000000]} ticks={[50000, 150000, 250000, 350000, 450000, 500000]}className='text-sm' />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="TotalGastado" fill="#728EC3" />
                        </BarChart>
                    </ResponsiveContainer>
            </div>
      );
    };


export default GastoAProveedores
