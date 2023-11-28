import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Enero',
    facturacion: 4000,
    gastos: 2400,
    amt: 2400,
  },
  {
    name: 'Febrero',
    facturacion: 3000,
    gastos: 1398,
    amt: 2210,
  },
  {
    name: 'Marzo',
    facturacion: 2000,
    gastos: 9800,
    amt: 2290,
  },
  {
    name: 'Abril',
    facturacion: 2780,
    gastos: 3908,
    amt: 2000,
  },
  {
    name: 'Mayo',
    facturacion: 1890,
    gastos: 4800,
    amt: 2181,
  },
  {
    name: 'Junio',
    facturacion: 2390,
    gastos: 3800,
    amt: 2500,
  },
  {
    name: 'Julio',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
  {
    name: 'Agosto',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
  {
    name: 'Septiembre',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
  {
    name: 'Octubre',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
  {
    name: 'Noviembre',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
  {
    name: 'Diciembre',
    facturacion: 3490,
    gastos: 4300,
    amt: 2100,
  },
];

const Lineas = () => {
  return (
    <>
    <div>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='m-8 text-md font-bold'>Facturacion Por meses</h1>
        </div>
        <ResponsiveContainer  minWidth={800} minHeight={900} width="100%" aspect={2}>
            <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="facturacion" stroke="#728EC3"  activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="gastos" stroke="#A6BBE4" />
            </LineChart>
        </ResponsiveContainer>  
    </div>
  
    </>

  );
};

export default Lineas;