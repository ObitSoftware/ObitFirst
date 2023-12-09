import React, { useState } from 'react';
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

function getItem(label, key, icon, children) {
  return { key, icon, children, label, };
}

const styles = {
  myMenuItem: {
    marginTop: '20px',
  },
};

const SidebarComponent = () => {

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

const items = [
  getItem( <p style={{ color: collapsed ? '#FFFFFF' : '#17202A', fontWeight: 'bold' }}>Inicio</p>,'1', (
    <Link to="/main">
      <img src={home} alt="Inicio" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
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
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Compras</p></Link>, '11'),
        getItem(<Link to="/ventasDashboard"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>Ventas</p></Link>, '12'),
      ]),

      getItem(<p style={{color:"#FFFFFF", fontWeight: 'bold',}}>Clientes</p>, 'sub3', (
        <img src={clients} alt="Inicio" style={{ width: '20px', height: '20px' }} />
      ), [
        getItem(collapsed ?<AddClientModal type="sideBar" colorSelected="white"/> : <AddClientModal type="sideBar"/>, '15'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>lalala</p></Link>, '16'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>lalala</p></Link>, '17'),
        getItem(<Link to="/prueba"><p style={{ color: collapsed ? '#17202A' : '#FFFFFF'}}>lalala</p></Link>, '18'),
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
];


  return (
    <>
    
        <Layout  >
          <Sider collapsible collapsed={collapsed}  className=' h-full' onCollapse={(value) => setCollapsed(value)} style={{position: "fixed", top:64,  left: 0, background:"#728EC3" }}>
            <div className="demo-logo-vertical" />
            <Menu style={{ background: '#728EC3', marginTop:"5px" }} defaultSelectedKeys={['1']} mode="inline" items={items}>
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


/*import React, { useState } from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import finance from "../img/finance.png"
import estadistics from "../img/estadistics.png"
import home from "../img/home.png"
import clients from "../img/clients.png"
import { Link } from 'react-router-dom';
import AddClientModal from './Modals/AddClientModal';

function getItem(label, key, icon, children) {
  return { key, icon, children, label, };
}


const MenuLateral = ({ children, title, open, backgroundColor = '#728EC3', textColor = '#FFFFFF' }) => {
  return (
    <Menu
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 4,
        padding: '8px 12px',
        display: open ? 'block' : 'none',
        marginLeft: 10,
        marginTop: 5,
      }}
    >
      {title && (
        <Menu.Item
          key={title}
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          {title}
        </Menu.Item>
      )}
      {children.map((child) => (
        <Menu.Item key={child.key} icon={child.icon}>
          {child.key === 'sub1' || child.key === 'sub2' ? (
            <MenuLateral open={open} children={child.children} backgroundColor="#7D3C98" textColor="#FFFFFF" />
          ) : (
            <p>{child.label}</p>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );
};



const items = [
  getItem(
    <Link to="/main">
      <img src={home} alt="Inicio" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
    </Link>,
    '1',
    <DesktopOutlined />
  ),
  getItem(
    <Link to="/prueba">
      <img src={finance} alt="Finanzas" style={{ width: '20px', height: '20px' }} />
    </Link>,
    '2',
    <PieChartOutlined />
  ),
  getItem(
    <img src={estadistics} alt="Estadísticas" style={{ width: '20px', height: '20px' }} />,
    'sub1',
    <FileOutlined />,
    [
      getItem('Productos', '3'),
      getItem('Proveedores', '4'),
      getItem('Gastos', '5'),
      getItem('Ingresos', '6'),
    ]
  ),
  getItem(
    <img src={clients} alt="Clientes" style={{ width: '20px', height: '20px' }} />,
    'sub2',
    <TeamOutlined />,
    [
      getItem(<AddClientModal type="sideBar" />, '7'),
      getItem('...', '8'),
      getItem('...', '9'),
      getItem('...', '10'),
    ]
  ),
];

const Otro = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            background: '#7D3C98',
            colorText: '#F8F9F9',
            fontWeight: 'medium',
            borderRadius: 2,
          },
        }}
      >
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            className="h-full"
            onCollapse={(value) => setCollapsed(value)}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              background: '#728EC3',
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              style={{ background: '#728EC3', marginTop: '10px', color: '#FFFFFF' }}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <p>{item.label}</p>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        </Layout>
      </ConfigProvider>
    </>
  )}
export default Otro;*/