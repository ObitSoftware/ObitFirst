import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import EditProductModal from "../Modals/EditProductModal"
import DeleteProductModal from "../Modals/DeleteProductModal"
import {SearchIcon} from "../UsersTable/SearchIcon";
import Loading from "../LoadingComponent/Loading";
import AddProductModal from "../Modals/AddProductModal";
import FiltersModal from "../Modals/FiltersModal";



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
        }, 500)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const columns = [
    {
      key: "nombre", 
      label: "Nombre",
      sortable: true
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
        <div className="flex justify-between w-full " style={{backgroundColor:"#E6EFFF"}}>
            <div className="flex justify-start items-center m-4">
              <FiltersModal />
            </div>    
            <div className="flex justify-end items-center m-4">
              <AddProductModal text={"PRODUCTO"}/>
            </div>      
        </div>
        <div className="flex items-start m-2">
            <Input style={{border: "none",  outline: "none", ":focus": { border: "none", }, ":active": { border: "none" },}}
                classNames={{ base: "w-full sm:max-w-[40%]" }} 
                disableFilled={true}
                startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                placeholder="Buscador"
                size="xxs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
        <Table aria-label="Example table with dynamic content"  className="w-[1195px] h-[676px]">
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

