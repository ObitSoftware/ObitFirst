import { Tooltip } from 'flowbite'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from "axios"


function getMonthNumber(monthName) {
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  return monthNames.indexOf(monthName.toLowerCase()) + 1;
}

const RankingVentaProductos = (props) => {

  const [rankingProductos, setRankingProductos] = useState([]);
  const [rankingGral, setRankingGral] = useState([])
  const [showRankingGral, setShowRankingGral] = useState(true)

  useEffect(() => {
    const fetchVentaData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/venta");
        const monthName = props.month.toLowerCase(); // Convertir a minúsculas
        const monthNumber = getMonthNumber(monthName);
  
        const productosVendidos = res.data
          .filter(venta => {
            const fechaVenta = venta.fechaCreacion;
            const dateParts = fechaVenta.split("/");
            if (dateParts.length === 3) {
              const ventaMonth = parseInt(dateParts[1], 10);
              return ventaMonth === monthNumber;
            } else {
              console.error(`Fecha de venta con formato inesperado: ${fechaVenta}`);
              return false;
            }
          })
          .reduce((acc, venta) => {
            const nombreProducto = venta.nombreProducto;
            const cantidadVendida = venta.cantidad || 0;
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
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchVentaData();
  }, [props.month]);

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

        setRankingGral(productosVendidos);
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
  <ResponsiveContainer width="100%" height="100%" aspect={5.2} className="max-h-fit-contain- max-w-fit-contain">
    {props.month.length === 0 ? 

      <BarChart data={rankingGral}>
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="NombreProducto" />
        <YAxis type="number"  domain={[0, 3]} ticks={[0, 5, 15]} className='text-sm' />
        <Tooltip />
        <Bar dataKey="CantidadVendida" fill="#728EC3" className='text-xs'/>
      </BarChart>
      :

      <BarChart data={rankingProductos}>
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="NombreProducto" />
        <YAxis type="number"  domain={[0, 3]} ticks={[0, 5, 15]} className='text-sm' />
        <Tooltip />
        {rankingProductos.length === 0 ? 

          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-2xl">No hay ventas</text>
          :

          <Bar dataKey="CantidadVendida" fill="#728EC3" className='text-xs'/>
        }
      </BarChart>
    }
  </ResponsiveContainer>
</div>
  )
}

export default RankingVentaProductos




/*import { Tooltip } from 'flowbite'
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
    <ResponsiveContainer width="100%" height="100%" aspect={5.2} className="max-h-fit-contain- max-w-fit-contain">
    <BarChart data={rankingProductos}>
      <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="NombreProducto" />
        <YAxis type="number"  domain={[0, 3]} ticks={[0, 5, 15]} className='text-sm' />
        <Tooltip />
        <Bar dataKey="CantidadVendida" fill="#728EC3" className='text-xs'/>
    </BarChart>
    </ResponsiveContainer>
</div>
  )
}

export default RankingVentaProductos
*/