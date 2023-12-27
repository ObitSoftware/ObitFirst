import React, {useState, useEffect, PureComponent } from 'react';
import axios from 'axios';
import { quantityPurchaseOfAllProviders } from '../DashboardProviders/FunctionsGetDataOfProviders';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const ProvidersPurchaseRanking = () => {

  const [data, setData] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);

  useEffect(() => {
    const getProvidersData = async () => {
        try {
          const getData = await quantityPurchaseOfAllProviders();
          setData(getData);
        } catch (error) {
          console.error(error);
        }
      };
      getProvidersData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={190}>
    <BarChart width={130} height={220}  data={data} margin={{top: 15,  right: 30,  left: 20,  bottom: 5,}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="proveedor"
              tick={{  fill: '#595858',
                style: {
                  fontWeight: 'bold',
                  fontSize: window.innerWidth > 1400 ? "11px" : "9px",
                },
              }}
              interval={window.innerWidth > 1400 ? 0 : 0}
            />
          <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#728EC3" activeBar={<Rectangle fill="#5C77A9" stroke="blue" />} />
    </BarChart>
  </ResponsiveContainer>
  );
};

export default ProvidersPurchaseRanking;
