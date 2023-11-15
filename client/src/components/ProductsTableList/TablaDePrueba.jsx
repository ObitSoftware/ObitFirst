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
import TabsComponent from "../Tabs/TabsComponent";

//import { Modal, ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Chip,Input, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";

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
 
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  
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

        <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior} className="w-[1195px] h-[676px]">
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

import React, { useState } from "react";
import { Modal, ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Chip,Input, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";
import "../../globals.css";
import TabsModal from "../components/tabs";


const rowsFirstTable = [
    {
      key: "1",
      CodigoProducto: "CEO",
      NombreProducto: "Active",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "2",
      CodigoProducto: "Technical Lead",
      NombreProducto: "Paused",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "3",
      CodigoProducto: "Senior Developer",
      NombreProducto: "Active",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "4",
      CodigoProducto: "Community Manager",
      NombreProducto: "Vacation",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
  ];
  
  const columnsFirstTable = [
   
    {
      key: "CodigoProducto",
      label: "Codigo Producto",
    },
    {
      key: "NombreProducto",
      label: "Nombre Producto",
    },
    {
       key: "Cantidad",
        label: "Cantidad",
      },
    {
     key: "Observaciones",
     label: "Observaciones",
    }
  ];


  
const rowsSecondTable = [
    {
      key: "1",
      Id: 1,
      CodigoProducto: "CEO",
      NombreProducto: "Active",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "2",
      Id: 2,
      CodigoProducto: "Technical Lead",
      NombreProducto: "Paused",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "3",
      Id: 3,
      CodigoProducto: "Senior Developer",
      NombreProducto: "Active",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "4",
      Id: 4,
      CodigoProducto: "Community Manager",
      NombreProducto: "Vacation",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
  ];
  
  const columnsSecondTable = [
    {
        key: "Id",
        label: "Id",
    },
    {
      key: "CodigoProducto",
      label: "Codigo Producto",
    },
    {
      key: "NombreProducto",
      label: "Nombre Producto",
    },
    {
       key: "Cantidad",
        label: "Cantidad",
    },
    {
       key: "CostoConfeccionUnitario",
       label: "Costo de Confeccion Unitario",
     },
     {
        key: "CostoConfeccionTotal",
        label: "Costo de Confeccion Total",
      },
    {
     key: "Observaciones",
     label: "Observaciones",
    }
  ];


const ProduccionDetailModal = () => {
	

	   const [modalIsOpenNow, setModalIsOpenNow] = useState(false);
     const [showFirstTable, setShowFirstTable] = useState(true)
     const [showSecondTable, setShowSecondTable] = useState(false)
     const [lastTable, setLastTable] = useState(false)

    const showingFirstTable = () => { 
        setShowFirstTable(true)
        setShowSecondTable(false)
        setLastTable(false)
        console.log("aa")
    }

    const showingSecondTable = () => { 
        setShowSecondTable(true)
        setShowFirstTable(false)
        setLastTable(false)
        console.log("bb")
    }

    const showButtonFinally = () => { 
      setLastTable(true)
      console.log("sdgbsh")
    }

	const openModal = () => {
		setModalIsOpenNow(true);
	};

	const closeModal = () => {
		setModalIsOpenNow(false);
	};

    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    


	return (
		<>
			<small className="underline cursor-pointer text-sm" onClick={openModal} color="default">
				Ver Detalle
			</small>
			<Modal isOpen={modalIsOpenNow} onOpenChange={closeModal} className="modalGeneral" classNames={{ wrapper: "items-center" }}>
				<ModalContent className="modalGeneral">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 items-center jusitify-start">
                                <TabsModal showFirst={showingFirstTable} showSecond={showingSecondTable} showLastTable={showButtonFinally}/>
                            </ModalHeader>
                                <ModalBody className="w-100% flex flex-col">
                                           <div className="flex flex-col border w-[1034px]">
                                               {showFirstTable ?
                                                    <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsFirstTable}>
                                                                {(columnsFirstTable) => <TableColumn key={columnsFirstTable.key}>{columnsFirstTable.label}</TableColumn>}
                                                                </TableHeader>
                                                                <TableBody items={rowsFirstTable}>
                                                                {(item) => (
                                                                    <TableRow key={item.key}>
                                                                     {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                                    </TableRow>                                                           
                                                                )}
                                                            </TableBody>     
                                                    </Table>                                                  
                                                    : null}

                                                    {showSecondTable ?
                                                    <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsSecondTable}>
                                                                {(columnsSecondTable) => <TableColumn key={columnsSecondTable.key}>{columnsSecondTable.label}</TableColumn>}
                                                                </TableHeader>
                                                                <TableBody items={rowsSecondTable}>
                                                                {(item) => (
                                                                    <TableRow key={item.key}>
                                                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                                    </TableRow>
                                                                )}
                                                            </TableBody>
                                                    </Table> : null}
                                            </div>
                                            <div className=" w-full flex justify-end">
                                               {showFirstTable ?  <Button className="mr-6">Pasar a Confeccion</Button> : null}
                                               {showSecondTable && !lastTable ?  <Button className="mr-6">Pasar a Planchado / Control de Calidad</Button> : null}
                                               {showSecondTable && lastTable ?  <Button className="mr-6">Finalizar</Button> : null}
                                            </div>
                                </ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default ProduccionDetailModal;

*/