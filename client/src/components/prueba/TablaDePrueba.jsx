import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import EditProductModal from "../Modals/EditProductModal"
import DeleteProductModal from "../Modals/DeleteProductModal"
import {SearchIcon} from "../UsersTable/SearchIcon";
import Loading from "../LoadingComponent/Loading";



export default function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios.get("http://localhost:3000/productos") 
      .then((res) => {
        setAllProducts(res.data);
        console.log(res.data)   
        setTimeout(() => { 
          setLoading(false)
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const columns = [
    {
      key: "nombre", 
      label: "Nombre",
    },
    {
      key: "descripcion",
      label: "Descripcion",
    },
    {
      key: "fechaCreacion",
      label: "Fecha de Creacion",
    },
    {
      key: "cantidad",
      label: "Cantidad",
    },
    {
      key: "stock",
      label: "Stock Actual",
    },
    {
      key: "categoria",
      label: "Categoria",
    },
    { 
      key: "proveedor",
      label: "Proveedor"
    },
    {
      key: "Eliminar",
      label: "Eliminar",
    },
    {
      key: "Editar",
      label: "Editar",
    },
  ];


  const allProductsSaved = allProducts.map((product) => ({
    nombre: product.nombre,
    descripcion: product.descripcion,
    fechaCreacion: product.fechaCreacion,
    cantidad: product.cantidad,
    stock: product.stock,
    categoria: product.categoria,
    proveedor: product.proveedor,
    Eliminar: <DeleteProductModal/>,
    Editar:   <EditProductModal />
  }));

  const filteredProducts = allProductsSaved.filter((product) => {
    const proveedorString = Array.isArray(product.proveedor)
      ? product.proveedor.join(", ") // Convierte el array a una cadena separada por comas
      : String(product.proveedor); // Convierte a cadena si no es un array
  
    return (
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fechaCreacion.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.cantidad.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.stock.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedorString.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
 

  return (
    <>
    { loading ? 
    <div className="flex items-center justify-center mt-44">
      <Loading text={"Cargando Productos"}/>
    </div>    
       :
      <div className="mt-6">
        <div className="flex items-start justify-start m-4">
            <Input
                style={{
                  border: "none",
                  outline: "none",
                  ":focus": {
                    border: "none",
                  },
                  ":active": {
                    border: "none", // <-- Add this line
                  },
                }}
              
                classNames={{ base: "w-full sm:max-w-[40%]" }} 
                disableFilled={true}
                startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                placeholder="Buscador"
                size="xxs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={filteredProducts}>
            {(item) => (
              <TableRow key={item.nombre}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  }
  </>
  );
}


/* 

import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,} from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios"
import EditModal from "./modals/EditModal"
import { Button } from "@nextui-org/react";
import Loading from "./components/Loading";
import OrderDetailModal from "./modals/OrderDetailModal";
import dotenv from "dotenv";

dotenv.config()



export default function Home({orders}) {

  //const backend_url_fly = process.env.API_FLY;
  //console.log(backend_url_fly)
  const router = useRouter();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    console.log(hasVisitedHome)
    
    if (!hasVisitedHome) {
    localStorage.setItem('hasVisitedHome', 'true'); 
    router.push('/login');
    }
    }, [router]);
  
    useEffect(() => {
      axios.get("https://allegra-apps.fly.dev/api/orders") //axios.get(`${backend_url_fly}/orders`)
        .then((res) => {
          setAllOrders(res.data.data.orders);
          console.log(res.data.data.orders)
          setLoading(false)
        })
        .catch((err) => {
          console.log(backend_url_fly)
          console.log(err);
        });
    }, []);

    const deleteOrder = (id) => { 
      axios.delete(`https://allegra-apps.fly.dev/api/orders/${id}`)
      setAllOrders(allOrders.filter(order => order.id !== id));
    }

  const columns = [
    {
      key: "NumeroDePedido", 
      label: "Numero de Pedido",
    },
    {
      key: "Razonsocial",
      label: "Razón social",
    },
    {
      key: "Cuit",
      label: "Cuit",
    },
    {
      key: "Email",
      label: "Email",
    },
    {
      key: "Ciudadprovincia",
      label: "Ciudad / Provincia",
    },
    {
      key: "Estado",
      label: "Estado",
    },
    { 
      key: "detalle",
      label: "Detalle de Orden"
    },
    {
      key: "Eliminar",
      label: "Eliminar",
    },
    {
      key: "Editar",
      label: "Editar",
    },
  ];

  const confirmedOrders = allOrders.map((order) => ({
    NumeroDePedido: order.id,
    Razonsocial: order.business_name,
    Cuit: order.cuit,
    Email: order.client_email,
    Ciudadprovincia: order.province,
    Estado: order.state,
    detalle:  <OrderDetailModal orderId={order.id} razonSocial={order.business_name} cuit={order.cuit}  email={order.client_email} localidad={order.province} estado={order.state} detalle={order.order_products}/>,
    Eliminar: <Button color="danger" onClick={() => deleteOrder(order.id)}>Eliminar</Button>,
    Editar:   <EditModal RazonSocial={order.business_name} Cuit={order.cuit} Email={order.client_email} Localidad={order.province}/>
  }));

  return (
    <>
    { loading ? 
    <div className="flex items-center justify-center mt-44">
       <Loading text="pedidos"/> 
    </div>    
       :
      <div className="mt-6">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={confirmedOrders}>
            {(item) => (
              <TableRow key={item.NumeroDePedido}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  }
  </>
  );
}

*/