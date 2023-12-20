import React, {useState, useEffect, PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';



const QuantityProductSell = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/venta");
        const ventas = response.data;
        const totalVentasPorCategoria = {};

        ventas.forEach((venta) => {
          const categoria = venta.categoriaProducto;

          if (totalVentasPorCategoria[categoria]) {
            totalVentasPorCategoria[categoria].cantidad += venta.cantidad;
          } else {
            totalVentasPorCategoria[categoria] = {
              categoria: categoria,
              cantidad: venta.cantidad,
            };
          }
        });

        const resultadoFinal = Object.values(totalVentasPorCategoria);
        setData(resultadoFinal);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart
        width={530}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
       <XAxis dataKey="categoria"
          tick={{  fill: '#595858',
            style: {
              fontWeight: 'bold',
              fontSize: window.innerWidth > 1400 ? "13px" : "11px",
            },
          }}
          interval={window.innerWidth > 1400 ? "preserveStartEnd" : 0}
        />
        <YAxis
          tick={{
            fill: '#595858',
            style: {
              fontWeight: 'bold',
              fontSize: window.innerWidth > 1400 ? "13px" : "11px", // Puedes ajustar esto según tus necesidades
            },
          }}
        />
        <Tooltip />
        <Area type="monotone" dataKey="cantidad" stroke="#728EC3" fill="#728EC3" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default QuantityProductSell;






/* 




import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Pastel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/venta");
        const ventas = response.data;
        const totalVentasPorCategoria = {};

        ventas.forEach((venta) => {
          const categoria = venta.categoriaProducto;

          if (totalVentasPorCategoria[categoria]) {
            totalVentasPorCategoria[categoria].cantidad += venta.cantidad;
          } else {
            totalVentasPorCategoria[categoria] = {
              categoria: categoria,
              cantidad: venta.cantidad,
            };
          }
        });

        const resultadoFinal = Object.values(totalVentasPorCategoria);
        setData(resultadoFinal);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={900} height={170}>
      <BarChart width={900} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barSize={20}>
        <XAxis dataKey="categoria" scale="point" padding={{ left: 10, right: 10 }}  tick={{ fontSize: 16, gap: 12 }}/>
        <YAxis />
        <Tooltip />

        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="cantidad" fill="#728EC3" background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Pastel;



*/