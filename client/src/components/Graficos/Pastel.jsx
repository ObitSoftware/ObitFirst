import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell  } from 'recharts';

const Pastel = () => {
  const [data, setData] = useState([]);

  const COLORS = ['#99CBEF', '#76BDF1', '#4A95CD', '#1F547B'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const category = payload[0].payload.categoria;
      return (
        <div className="bg-white border border-black p-5">
          <p>{`Categoría: ${category}`}</p>
        </div>
      );
    }
    return null;
  };

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
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
          <PieChart>
          <Pie dataKey="cantidad" data={data} label onMouseOver={(e) => console.log(e.categoria)}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Tooltip content={<CustomTooltip />} />
          </Pie>
         </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Pastel;
