import React from 'react'
import { topProductsWithMoreNetGains } from '../DashboardProducts/FunctionsGetDataOfProducts'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const TopProductsWithMoreNetGains = () => {
  
  const [data, setData] = useState([])

  useEffect(() => { 
   const getDataNow = async () => { 
        try {
            const theData = await topProductsWithMoreNetGains()
            setData(theData)
        } catch (error) {
            console.log(error)
        }
   }
   getDataNow()
  }, [])
  
    const COLORS = ['#7BAAF7', '#3367D6', '#C6DAFC', '#7BAAF7'];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
           {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
      };
  
    return (
     
     <ResponsiveContainer width="100%" height="100%">
         <PieChart width={400} height={400}>
             <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="netGain"
                nameKey="productName" 
            >
                {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Legend align="right" verticalAlign="middle" layout="vertical" />
         </PieChart>
        </ResponsiveContainer>
        

     );
}

export default TopProductsWithMoreNetGains

/*productNAME, NETgAIN*/