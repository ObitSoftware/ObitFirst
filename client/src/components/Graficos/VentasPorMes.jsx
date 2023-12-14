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
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from "moment"
import 'moment/locale/es'; 



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

const VentasPorMes = () => {

    const [rankingMensualDeVentas, setRankingMensualDeVentas] = useState([])

    useEffect(() => {
      axios.get("http://localhost:3000/venta")
        .then((res) => {
          // Configura el idioma en español
          moment.locale('es');
  
          // Obtener un objeto que acumula la cantidad de ventas por mes
          const ventasPorMes = res.data.reduce((acc, venta) => {
            const fechaCreacion = moment(venta.fechaCreacion, 'DD/MM/YYYY');
            const nombreDelMes = fechaCreacion.format('MMMM'); // Obtener el nombre del mes
  
            // Si el mes ya está en el acumulador, sumar la cantidad; de lo contrario, agregarlo
            if (acc[nombreDelMes]) {
              acc[nombreDelMes]++;
            } else {
              acc[nombreDelMes] = 1;
            }
  
            return acc;
          }, {});
  
          // Convertir el objeto acumulado de meses y cantidades a un array de objetos
          
        const resultado = Object.entries(ventasPorMes).map(([nombreDelMes, cantidadDeVentas]) => ({
          NombreDelMes: nombreDelMes,
          CantidadDeVentas: cantidadDeVentas
        }));

        // Ordena el array por el número correspondiente a cada mes
        resultado.sort((a, b) => moment().month(a.NombreDelMes) - moment().month(b.NombreDelMes));

        setRankingMensualDeVentas(resultado);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    useEffect(() => { 
     console.log(rankingMensualDeVentas)
    }, [rankingMensualDeVentas])

  return (
    <>
        <div className='flex items-center justify-center flex-grow '> 
        <ResponsiveContainer width="100%" height={190}>
            <LineChart width={500} height={300} data={rankingMensualDeVentas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="NombreDelMes" padding={{ left: 30, right: 30 }} />
                    <YAxis type="number"  domain={[0, 5]} ticks={[0, 5, 10, 15, 20, 25, 30]} className='text-sm' />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CantidadDeVentas" stroke="#728EC3"  activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>  
        </div>
  
    </>

  );
};

export default VentasPorMes;