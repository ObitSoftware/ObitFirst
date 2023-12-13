import { Tooltip } from 'flowbite'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import VentasPorMes from './VentasPorMes'
import PasQuantityProductSelltel from './QuantityProductSell'
import axios from "axios"

const data = [
    {
        usuario: "Octavio",
        facturacion: 125900,
        cantidadDeCompras: 2
    },
    {
        usuario: "Pedro",
        facturacion: 651900,
        cantidadDeCompras: 7
    },
    {
        usuario: "Alvaro",
        facturacion: 735200,
        cantidadDeCompras: 1
    },
    {
        usuario: "Julio",
        facturacion: 431716,
        cantidadDeCompras: 4
    }
]

const RankingDeUsuarios = () => {

    const [resultado, setResultado] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/venta")
          .then((res) => {
            // Obtener un objeto que acumula la cantidad de productos para cada cliente
            const clienteCantidadMap = res.data.reduce((acc, venta) => {
              const nombreCliente = venta.nombreCliente;
              const cantidad = venta.cantidad;
              if (acc[nombreCliente]) {
                acc[nombreCliente] += cantidad;
              } else {
                acc[nombreCliente] = cantidad;
              }
              return acc;
            }, {});
    
            const resultado = Object.entries(clienteCantidadMap).map(([nombreCliente, cantidad]) => ({
              NombreCliente: nombreCliente,
              Cantidad: cantidad
            }));
      
            setResultado(resultado);
            console.log(resultado)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <>
            <div className='flex flex-col items-center mt-56'>
                <p className='m-8 text-md font-bold'>Usuarios con mas compras</p>
                <ResponsiveContainer minWidth={1400} minHeight={900} width="100%" aspect={4}>
                    <BarChart data={resultado} width={500} height={300}>
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey="NombreCliente" />
                        <YAxis type="number"  domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} className='text-sm' />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Cantidad" fill="#728EC3" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

           
        </>
    )
}

export default RankingDeUsuarios;