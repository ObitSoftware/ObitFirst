import React, { useEffect } from 'react';
import TablaGenerica from '../../pages/TablaGenerica'
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import  {LineChart}  from './AreaChart'


const Dashboard = () => {
   
 
  return (
    <div className="flex">
        <LineChart/>
     </div>

  );
};



export default Dashboard;





