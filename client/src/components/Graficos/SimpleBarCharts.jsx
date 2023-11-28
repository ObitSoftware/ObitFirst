import { Tooltip } from 'flowbite'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Lineas from './Lineas'
import Pastel from './Pastel'

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

const SimpleBarCharts = () => {
    return (
        <>
            <div className='flex flex-col items-center mt-56'>
                <h1 className='m-8 text-md font-bold'>Usuarios con mas compras</h1>
                <ResponsiveContainer minWidth={800} minHeight={900} width="100%" aspect={2}>
                    <BarChart data={data} width={500} height={300}>
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey="usuario" />
                        <YAxis type="number" tickFormatter={(value) => `${value}$`} domain={[50000, 1000000]} ticks={[50000, 200000, 400000, 600000, 800000, 1000000]} className='text-sm' />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="facturacion" fill="#728EC3" />
                        <Bar dataKey="cantidadDeCompras" fill="#A6BBE4" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                <Lineas />
                <Pastel />
            </div>
        </>
    )
}

export default SimpleBarCharts;