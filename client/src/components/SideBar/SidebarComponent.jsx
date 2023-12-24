import React, { useEffect, useState } from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import finance from "../../img/FinanceUno.png"
import estadistics from "../../img/EstadisticsUno.png"
import home from "../../img/HomeUno.png"
import clients from "../../img/ClientUno.png"
import tesoreria from "../../img/TesoreriaUno.png"
import { Link } from 'react-router-dom';
import AddClientModal from '../Modals/AddClientModal';
import usersIcon from "../../img/people.png"
import AddCategory from '../Modals/AddCategory';
import config from "../../img/confi.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import casaAzul from "../../img/casaAzul.png"
import tesoreriaAzul from "../../img/tesoreriaAzul.png"
import estadisticasAzul from "../../img/estadisticasAzul.png"
import finanzasAzul from "../../img/finanzasAzul.png"
import lapizBlanco from "../../img/lapizBlanco.png"

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children
  };
 }

const styles = {
  myMenuItem: {
    marginTop: '20px',
  },
  activeColor: "null",
};

const SidebarComponent = () => {

  const [collapsed, setCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(""); // Inicializa con el primer elemento


  const navigate = useNavigate()
  const userCtx = useContext(UserContext)

  const logOut = () => { 
    userCtx.updateUser(null)
    userCtx.updateUserName(null)
    userCtx.updateUserRol(null)
    userCtx.updateUserEmail(null)
  }

  const goToPage = (rute) => { 
    navigate(rute)
    logOut()
}
  
useEffect(() => { 
  console.log(selectedItem)
}, [selectedItem])


  const items = [
      getItem( <p style={{ color: collapsed ? '#FFFFFF' : '#17202A', fontWeight: 'bold' }}   onMouseOver={() => setSelectedItem("Inicio")}  onMouseLeave={() => setSelectedItem("")}> Inicio</p>,'1', (
        <Link to="/main">
           {selectedItem === "Inicio" ?
              <img src={casaAzul} style={{ width: '20px', height: '20px', marginRight: '5px' }}  />
               :
              <img src={home} alt="Inicio" style={{ width: '20px', height: '20px', marginRight: '5px' }}  onMouseOver={() => setSelectedItem("Inicio")}  onMouseLeave={() => setSelectedItem("")} />
            }
        </Link>
      )),
 
    getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold'}}>Finanzas</p>, 'sub1', (
      <img src={finance} alt="Inicio" style={{ width: '20px', height: '20px' }} />
    ), [
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Mensuales</p></Link>, "2"),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Anuales</p></Link>, '3'),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Proveedores</p></Link>, '4'),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos Anuales</p></Link>, '5'),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos Mensuales</p></Link>, '6'),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos por Clientes</p></Link>, '7'),
      getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos por Producto</p></Link>, '8'),
    ]),

      getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold',}}>Estadisticas</p>, 'sub2', (
        <img src={estadistics} alt="Inicio" style={{ width: '20px', height: '20px' }} />
      ), [
        getItem(<Link to="/productosDashboard"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Productos</p></Link>, '9'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Proveedores</p></Link>, '10'),
        getItem(<Link to="/comprasDashboard"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Compras</p></Link>, '11'),
        getItem(<Link to="/ventasDashboard"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ventas</p></Link>, '12'),
      ]),

      getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold'}}>Tesoreria</p>, 'sub 3', (
        <img src={tesoreria} alt="Inicio" style={{ width: '20px', height: '20px' }} />
      ), [
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Mensuales</p></Link>, "19"),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Anuales</p></Link>, '20'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Gastos Proveedores</p></Link>, '21'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos Anuales</p></Link>, '22'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos Mensuales</p></Link>, '23'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos por Clientes</p></Link>, '24'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ingresos por Producto</p></Link>, '25'),
      ]),

      getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold'}}>Acciones</p>, 'sub 4', (
        <img src={lapizBlanco} alt="Inicio" style={{ width: '20px', height: '20px' }} />
      ), [
        getItem(collapsed ? <AddCategory type="white" /> : <AddCategory type="sideBar"/>, "19"),
        getItem(collapsed ? <AddClientModal type="sideBar" colorSelected="white"/> : <AddClientModal type="sideBar"/>, '20'),
      ]),

      getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold'}}>Configuracion</p>, 'sub 5', (
        <div>
          <img src={config} alt="Inicio" className='object-fit-contain' style={{ width: '20px', height: '20px' }} />
        </div>
      ), [
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Mi perfil</p></Link>, "19"),
        getItem(<Link to="/usersData"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Usuarios</p></Link>, '20'),
        getItem(<p onClick={() => goToPage("/")} style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Cerrar Sesion</p>, '21'),
      ]),
  ];


  return (
    <>
    
        <Layout  >
          <Sider collapsible collapsed={collapsed}  className=' h-full' onCollapse={(value) => setCollapsed(value)} style={{position: "fixed", top:64,  left: 0, background:"#728EC3" }}>
            <div className="demo-logo-vertical" />
            <Menu style={{ background: '#728EC3', marginTop:"5px" }} defaultSelectedKeys={['1']} mode="inline" items={items} activeColor="#D12478">
              {items.map((item) => (
               <Menu.Item key={item.key} icon={item.icon} style={styles.myMenuItem}>
                <p >{item.label}</p> 
               </Menu.Item>
              ))}
            </Menu>
          </Sider>
        </Layout>

 
    </>
  );
};
export default SidebarComponent;


