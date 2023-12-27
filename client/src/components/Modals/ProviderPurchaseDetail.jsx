import React, {useState, useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";


export default function ProviderPurchaseDetail({detail, totalNetGain}) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (detail && detail.length > 0) {
      const firstDetail = detail[0];
      const properties = Object.keys(firstDetail);
      const filteredProperties = properties.filter(property => property !== 'idProducto' && property !== "_id"  && property !== "__v"  && property !== "idCliente");
  
      const columnLabelsMap = {
        precioProducto: 'Precio',
        fechaCreacion: 'Fecha de Venta',
        nombreProducto: 'Producto',
        gananciaNeta: 'Ganancia',
        nombreCliente: 'Cliente',
        categoriaProducto: 'Categoria',
        proveedorProducto: 'Proveedor',
      };
  
      const tableColumns = filteredProperties.map(property => ({
        key: property,
        label: columnLabelsMap[property] ? columnLabelsMap[property] : property.charAt(0).toUpperCase() + property.slice(1),
      }));
  
      setColumns(tableColumns);
    }
  }, [detail]);

  return (
    <>
       <p onClick={onOpen} className='text-xs font-medium ml-2 underline cursor-pointer'  style={{color:'#728EC3'}}> Ver Detalle</p>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-max">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1" style={{color:'#728EC3'}}> Ventas de Productos del Proveedor: {detail.length > 0 ? detail[0].proveedorProducto : ""}</ModalHeader>
                  <ModalBody>
                     <Table aria-label="Example table with dynamic content" className="max-w-fit-contain flex items-center justify-center max-h-[400px] overflow-y-auto">
                              <TableHeader columns={columns}>
                                {(column) => (
                                  <TableColumn key={column.key} className="text-xs gap-6">
                                    {column.label}
                                  </TableColumn>
                                )}
                              </TableHeader>
                              <TableBody items={detail}>
                              {(item) => (
                                <TableRow key={item.nombreProducto}>
                                  {columns.map(column => (
                                    <TableCell key={column.key} className="text-start items-start">
                                      {item[column.key]}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              )}
                            </TableBody>
                        </Table>        
                         <div className='flex justify-end items-center w-full  mt-4 mr-6'>
                            <p className='text-xs font-bold' style={{color:'#728EC3'}}>Ganancia Neta Total: {totalNetGain} $</p>
                          </div>           
                       
                  </ModalBody>       
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  );
}