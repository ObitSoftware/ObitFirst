import React, { useEffect, useState } from 'react'
import { quantityPurchaseOfAllCategorys } from '../DashboardPuchaseDetail/FunctionsGetDataOfPurchase';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const QuantityCategoryProductsPurchase = () => {

    const [quantityOfCategorys, setQuantityOfCategorys] = useState([])

    useEffect(() => { 
      const getMyData = async () => { 
        try {
            const dataToGraphic = await quantityPurchaseOfAllCategorys()
            setQuantityOfCategorys(dataToGraphic)
            console.log("TERMINE DE EJECUTARME")
        } catch (error) {
            console.log(error)
        }
      }
      getMyData()
    }, [])

   



    useEffect(() => { 
        console.log("LA DATA SETEADA", quantityOfCategorys)
        
      }, [quantityOfCategorys])
     


    return (
      <ResponsiveContainer width="100%" height={190}>
          <BarChart width={130} height={220}  data={quantityOfCategorys} margin={{top: 15,  right: 30,  left: 20,  bottom: 5,}}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoriaProducto" />
                <YAxis />
                <Tooltip />
                  <Bar dataKey="cantidad" fill="#728EC3" activeBar={<Rectangle fill="#5C77A9" stroke="blue" />} />
          </BarChart>
        </ResponsiveContainer>


    );
  };
  
  export default QuantityCategoryProductsPurchase;
