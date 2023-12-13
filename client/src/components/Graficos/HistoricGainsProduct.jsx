
import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getHistoricGainsOfProduct } from '../DashboardProducts/FunctionsGetDataOfProducts';


const HistoricGainsProduct = () => {

    const [historicGains, setHistoricGains] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const gains = await getHistoricGainsOfProduct();
          setHistoricGains(gains);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []); 


    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={historicGains}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="nombreProducto" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="gananciaNetaTotal" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default HistoricGainsProduct;