import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { PlusIcon } from '../icons/PlusIcon';
import axios from 'axios';
import obtenerFechaActual from '../../functions/actualDate.js';
import { v4 as uuidv4 } from 'uuid';
import AddProductModal from './AddProductModal';
import {Textarea} from "@nextui-org/react";


const AddBuyModal = () => {
  const randomId = uuidv4();
  const [productExist, setProductExist] = useState(false);
  const [productsAvailable, setProductsAvailable] = useState([]);
  const [productId, setProductId] = useState('');
  const [productSelectedData, setProductSelectedData] = useState([]);
  const [succesMessage, setSuccesMessage] = useState(false);
  const [productosComprados, setProductosComprados] = useState([]);
  const [showOrdersChoosen, setShowOrdersChoosen] = useState(false)
  const [productToBuyData, setProductToBuyData] = useState({
    proveedor: '',
    productoId: '',
    precioProducto: '',
    fechaPago: '',
    observaciones: '',
    cantidad: '',
    total: '',
    nombreProducto: '',
  });

  const fechaActual = obtenerFechaActual();

  useEffect(() => {
    axios.get('http://localhost:3000/productos')
         .then((res) => {
           console.log(res.data);
           setProductsAvailable(res.data);
          })
          .catch((err) => {
            console.log(err);
         });
    }, []);

  const getProductId = () => {
     axios.get(`http://localhost:3000/productos/${productId}`)
          .then((res) => {
            console.log(res.data);
            setProductSelectedData(res.data);
            setProductToBuyData((prevState) => ({
              ...prevState,
              proveedor: res.data.proveedor,
              productoId: res.data._id,
              precioProducto: res.data.precio,
              nombreProducto: res.data.nombre,
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        if (productId !== '') {
          getProductId();
        }
      }, [productId]);

      useEffect(() => {
        console.log(productToBuyData);
      }, [productToBuyData]);

      useEffect(() => {
        console.log(productosComprados);
      }, [productosComprados]);

    const handleFechaDePagoChange = (e) => {
      const fechaDePagoValue = e.target.value;
      setProductToBuyData((prevState) => ({
        ...prevState,
        fechaPago: fechaDePagoValue,
      }));
    };

    const agregarProducto = () => {
      setShowOrdersChoosen(true)
      setProductosComprados((prevProductos) => [
        ...prevProductos,
        {
          proveedor: productToBuyData.proveedor,
          productoId: productToBuyData.productoId,
          precioProducto: productToBuyData.precioProducto,
          fechaPago: productToBuyData.fechaPago,
          observaciones: productToBuyData.observaciones,
          cantidad: productToBuyData.cantidad,
          total: productToBuyData.total,
          nombreProducto: productToBuyData.nombreProducto,
        },
      ]);
  
      setProductToBuyData({
        proveedor: '',
        productoId: '',
        precioProducto: '',
        fechaPago: '',
        observaciones: '',
        cantidad: '',
        total: '',
        nombreProducto: '',
      });
    };

    
    const sendMyNewBuy = () => {
      const productoActual = {
        proveedor: productToBuyData.proveedor,
        productoId: productToBuyData.productoId,
        precioProducto: productToBuyData.precioProducto,
        fechaPago: productToBuyData.fechaPago,
        observaciones: productToBuyData.observaciones,
        cantidad: productToBuyData.cantidad,
        total: productToBuyData.total,
        nombreProducto: productToBuyData.nombreProducto,
      };
    
      setProductosComprados((prevProductos) => [...prevProductos, productoActual]);
    
      const newBuyToBeSaved = {
        compraId: randomId,
        fechaCompra: fechaActual,
        total: productosComprados.reduce((total, producto) => total + parseFloat(producto.total), 0) + parseFloat(productoActual.total),
        productosComprados: [...productosComprados, productoActual],
      };
    
      axios
        .post('http://localhost:3000/compras', newBuyToBeSaved)
        .then((res) => {
          console.log(res.data);
          setSuccesMessage(true);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        })
        .catch((err) => {
          console.log(err);
        });
    };


  const cancelTheBuy = () => {
    setProductosComprados([]);
    setShowProductData(false);
  };

  return (
    <div>
      <Button onClick={() => document.getElementById('my_modal_23').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }} endContent={<PlusIcon />} size="sm">
        AÑADIR COMPRA
      </Button>
      <dialog id="my_modal_23" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">  ✕</button>
          </form>
          <div className="flex flex-col">
            <div className="flex justify-start items-start ">
              <small className="font-bold text-lg" style={{ color: '#5C77A9' }}>   Crear Nueva Compra </small>
            </div>

            <div className="border border-gray-200 mt-2"></div>

            <div className="flex gap-8 items-center justify-center text-center  mt-4">
              <Button className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }}size="sm" onClick={() => setProductExist(true)}>PRODUCTO EXISTENTE </Button>
              <AddProductModal />
            </div>

            <div className="flex flex-col items-center jsutify-center mt-8">
              {productExist ? (
                <div className="flex flex-col text-center items-center gap-2">
                  <small className="font-bold">Producto</small>
                  <select
                    className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center"
                    style={{ backgroundColor: '#E6EEFF' }}
                    display="flex"
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const selectedId = productsAvailable.find(
                        (p) => p.nombre === selectedName
                      )._id;
                      setProductId(selectedId);
                    }}
                  >
                    {productsAvailable.map((p) => (
                      <option key={p._id}>{p.nombre}</option>
                    ))}
                  </select>

                  <div className="flex flex-col text-center justify-center gap-2">
                    <p>Cantidad</p>
                    <input
                      type="number"
                      className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center"
                      value={productToBuyData.cantidad}
                      style={{ backgroundColor: '#E6EEFF' }}
                      onChange={(e) => {
                        const cantidadValue = e.target.value;
                        const precioProducto = productToBuyData.precioProducto;
                        const totalValue = cantidadValue * precioProducto;
                        setProductToBuyData((prevState) => ({
                          ...prevState,
                          cantidad: cantidadValue,
                          total: totalValue,
                        }));
                      }}
                    />
                  </div>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <p>Observaciones</p>
                    <Textarea
                   value={productToBuyData.observaciones}        
                   onChange={(e) => {
                    const observacionesAclaradas = e.target.value;
                    setProductToBuyData((prevState) => ({
                      ...prevState,
                      observaciones: observacionesAclaradas,
                    }));
                  }}
                   placeholder="Enter your description"
                   className="max-w-xs border border-none"
                />
                  </div>

               

                  <div className="mt-4">
                    <p>Selecciona la fecha de Pago</p>
                    <input type="date"  style={{ backgroundColor: '#E6EEFF' }} value={productToBuyData.fechaPago} onChange={handleFechaDePagoChange}></input>
                  </div>

                {showOrdersChoosen ?
                    <div className="flex flex-col items-start justify-start mt-6 mb-2">
                        {productosComprados.map((p) => (
                          <div key={p.nombreProducto} className="flex flex-col">
                            <ul className="list-disc flex flex-col ">
                              <li className="text-sm font-bold">{p.nombreProducto} - {p.cantidad} Unidades</li>
                            </ul>
                      
                          </div>   
                        ))}
                    </div> 

                    : null} 

                  {succesMessage ? (
                    <p style={{ color: '#728EC3' }} className="text-sm font-bold">
                      Compra añadida con Éxito
                    </p>
                  ) : (
                    <div className="flex gap-6 items-center justify-center mt-4">
                      <Button className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }} size="sm" onClick={() => sendMyNewBuy()}>Finalizar</Button>
                      <Button className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }} size="sm" onClick={() => agregarProducto()}>Agregar Otro</Button>
                      <Button className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }} size="sm" onClick={() => cancelTheBuy()}>Cancelar</Button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddBuyModal;


/*



*import React, {useState, useEffect} from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';
import AddProductModal from './AddProductModal'

//compraId, fechaDeCompra, total... productosComprados = {proveedorId... productoId..... precioProducto... fechaPago, observaciones, cantidad...... total, nombreProducto......}

const AddBuyModal = () => {

  const randomId = uuidv4();
  const [productExist, setProductExist] = useState(false)
  const [productsAvailable, setProductsAvailable] = useState([])
  const [productId, setProductId] = useState("")
  const [productSelectedData, setProductSelectedData] = useState([])
  const [succesMessage, setSuccesMessage] = useState(false)
  const [productToBuyData, setProductToBuyData] = useState({ 
    proveedor: '',
    productoId: '',
    precioProducto: '',
    fechaPago: '',
    observaciones: '',
    cantidad: '',
    total: '',
    nombreProducto: ''
  });
  
    const fechaActual = obtenerFechaActual()

      useEffect(() => { 
        axios.get("http://localhost:3000/productos")
            .then((res) => { 
              console.log(res.data)
              setProductsAvailable(res.data)
            })
            .catch((err) => { 
              console.log(err)
          })
      }, [])

      const getProductId = () => { 
        axios.get(`http://localhost:3000/productos/${productId}`)
          .then((res) => { 
            console.log(res.data)
            setProductSelectedData(res.data)
            setProductToBuyData(prevState => ({
              ...prevState,
              proveedor: res.data.proveedor,
              productoId: res.data._id,
              precioProducto: res.data.precio,
              nombreProducto: res.data.nombre,             
            }));
          })
          .catch((err) => { 
            console.log(err)
          })
       }

      useEffect(() => {
        if (productId !== "") {
          getProductId();
          setTimeout(() => { 
            setShowProductData(true)
          }, 1000)
        }
      }, [productId]);


      useEffect(() => { 
      console.log(productToBuyData)
      }, [productToBuyData])

      const handleFechaDePagoChange = (e) => {
        const fechaDePagoValue = e.target.value;
        setProductToBuyData((prevState) => ({
          ...prevState,
          fechaPago: fechaDePagoValue,
        }));
      };
      
      const sendMyNewBuy = () => { 
        const productosComprados = [productToBuyData];
        const newBuyToBeSaved = ({ 
          compraId: randomId,
          fechaCompra: fechaActual,
          total: productToBuyData.total,
          productosComprados: productosComprados
        })
        axios.post("http://localhost:3000/compras", newBuyToBeSaved)
             .then((res) => { 
              console.log(res.data)
              setSuccesMessage(true)
              setTimeout(() => { 
                 window.location.reload()
              }, 2500)
             })
             .catch((err) => { 
              console.log(err)
             })
      }

      const cancelTheBuy = () => { 
        setProductToBuyData(null)
        setShowProductData(false)
      }

  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_23').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm">    AÑADIR COMPRA 
      </Button>
        <dialog id="my_modal_23" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className='flex flex-col'>
                  <div className='flex justify-start items-start '>
                    <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nueva Compra</small>
                  </div>

                  <div className='border border-gray-200 mt-2'></div>

                  <div className='flex gap-8 items-center justify-center text-center  mt-4'>
                        <Button className="bg-foreground text-background font-bold cursor-pointer" style={{backgroundColor:"#60BCFF"}} size="sm" onClick={() => setProductExist(true)}>PRODUCTO EXISTENTE</Button>
                        <AddProductModal />
                  </div>

                  <div className='flex flex-col items-center jsutify-center mt-8'>
                      {productExist ? 

                          <div className='flex flex-col text-center items-center gap-2'>
                            <small className='font-bold'>Producto</small>
                              <select  className="h-9 rounded-lg border border-none w-44 text-sm text-center justify-center" style={{backgroundColor:"#E6EEFF"}} display="flex" onChange={(e) => {
                                const selectedName = e.target.value; const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id; setProductId(selectedId);}}>
                                {productsAvailable.map((p) => (
                                    <> 
                                        <option key={p._id}>{p.nombre}</option>
                                    </>
                                ))}
                            </select>

                            <div className='flex flex-col text-center justify-center gap-2'>
                              <p>Cantidad</p>
                            <input type="number" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' style={{backgroundColor:"#E6EEFF"}} 
                                  onChange={(e) => {
                                    const cantidadValue = e.target.value;
                                    console.log(cantidadValue)
                                    const precioProducto = productToBuyData.precioProducto;
                                    const totalValue = cantidadValue * precioProducto;
                                    setProductToBuyData((prevState) => ({
                                      ...prevState,
                                      cantidad: cantidadValue,
                                      total: totalValue,
                                    }));
                                  }}
                                />
                            </div>

                            <div className='mt-4 flex flex-col items-center justify-center'>
                               <p>Observaciones</p>
                               <textarea onChange={(e) => {
                                    const observacionesAclaradas = e.target.value;
                                    setProductToBuyData((prevState) => ({
                                      ...prevState,
                                      observaciones: observacionesAclaradas
                                    }));
                                  }}></textarea>
                            </div>

                            <div className='mt-4'>
                                 <p>Selecciona la fecha de Pago</p>
                                 <input type="date" onChange={handleFechaDePagoChange}></input>
                            </div>

                           {succesMessage ?
                            <p style={{color:"#728EC3"}} className="text-sm font-bold">Compra añadida con Exito</p>
                            :
                           <div className='flex gap-6 items-center justify-center'>
                              <Button onClick={() => sendMyNewBuy()}>Finalizar</Button>
                              <Button onClick={() => sendMyNewBuy()}>Agregar Otro</Button>
                              <Button onClick={() => cancelTheBuy()}>Cancelar</Button>
                            </div>}
                        </div>  : null}
                  </div>
             </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddBuyModal
*/