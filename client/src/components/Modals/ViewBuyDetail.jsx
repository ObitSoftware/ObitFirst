import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";



const ViewBuyDetail = ({ producto, totalAmount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [columns, setColumns] = useState([]);

  console.log(producto)

  useEffect(() => {
    if (producto && producto.detail && Array.isArray(producto.detail) && producto.detail.length > 0) {
      const firstDetail = producto.detail[0];
      const properties = Object.keys(firstDetail);
      const filteredProperties = properties.filter(property => property !== 'productoId' && property !== "observaciones");
  
      const columnLabelsMap = {
        precioProducto: 'Precio',
        fechaPago: 'Fecha De Pago',
        nombreProducto: 'Nombre',
      };
  
      const tableColumns = filteredProperties.map(property => ({
        key: property,
        label: columnLabelsMap[property] ? columnLabelsMap[property] : property.charAt(0).toUpperCase() + property.slice(1),
      }));
  
      setColumns(tableColumns);
    }
  }, [producto]);

  return (
    <>
      <small onClick={onOpen} className="bg-white text-background font-bold cursor-pointer" style={{ color: "#60BCFF" }}>
        Ver Detalle
      </small>
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1" style={{ color: "#728EC3" }}>
                Detalle de Compra
              </ModalHeader>
              <div className='border border-gray-200'></div>
                <div className='flex items-start justify-start mt-4 ml-4'>
                   <p className='text-xs'>Fecha de Compra: {producto.date}</p>
                </div>
              <ModalBody>
                <div className='flex flex-col text-center items-center justify-center mt-6'>
                  {producto && producto.detail && Array.isArray(producto.detail) && producto.detail.length > 0 ? (
                    <>
                         <Table aria-label="Example table with dynamic content" className="w-full flex items-center justify-center">
                              <TableHeader columns={columns}>
                                {(column) => (
                                  <TableColumn key={column.key} className="text-xs gap-6">
                                    {column.label}
                                  </TableColumn>
                                )}
                              </TableHeader>
                              <TableBody items={producto.detail}>
                              {(item) => (
                                <TableRow key={item.nombreProducto}>
                                  {columns.map(column => (
                                    <TableCell key={column.key} className="text-center">
                                      {item[column.key]}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              )}
                            </TableBody>
                        </Table>
                    
                    <div className='flex justify-end items-center w-full mt-6'>
                      <p className='text-xs font-bold'>Total Gastado: {totalAmount} $</p>
                    </div>

                    </>

                  ) : (
                    <p>No hay datos para mostrar</p>
                  )}
                  <div className='flex items-center justify-center mt-6 gap-6'>
                    <button className='h-10 w-42 rounded-lg font-bold text-white text-center flex border border-none' style={{ backgroundColor: "#728EC3" }}>
                      Si, estoy seguro
                    </button>
                    <button className='h-10 w-36 rounded-lg bg-white flex text-center border justify-center' style={{ color: "#728EC3", borderColor: "#728EC3" }} onClick={onClose}>
                      No, cancelar
                    </button>
                  </div>
                  {successMessage ? (
                    <div className="flex flex-col items-center text-center justify-center mt-6">
                      <p style={{ color: "#728EC3" }} className="text-sm font-bold">Eliminado correctamente</p>
                    </div>
                  ) : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewBuyDetail;
