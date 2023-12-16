import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { PlusIcon } from '../icons/PlusIcon';
import axios from 'axios';
import obtenerFechaActual from '../../functions/actualDate.js';
import { v4 as uuidv4 } from 'uuid';
import AddProductModal from './AddProductModal';
import {Textarea} from "@nextui-org/react";
import Arrow from "../../img/arrow.png"


const AddBuyModal = ({updateList}) => {
  const randomId = uuidv4();
  const [productExist, setProductExist] = useState(false);
  const [productsAvailable, setProductsAvailable] = useState([]);
  const [productId, setProductId] = useState('');
  const [productSelectedData, setProductSelectedData] = useState([]);
  const [succesMessage, setSuccesMessage] = useState(false);
  const [productosComprados, setProductosComprados] = useState([]);
  const [showOrdersChoosen, setShowOrdersChoosen] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState("")
  const [productToBuyData, setProductToBuyData] = useState({
    proveedor: '',
    productoId: '',
    precioProducto: '',
    categoriaProducto: "",
    fechaPago: '',
    observaciones: '',
    cantidad: '',
    total: '',
    nombreProducto: '',
  });
  const [dataIsIncompleted, setDataIsIncompleted] = useState(false)
  const [missedData, setMissedData] = useState(false)
  const [textMissedData, setTextMissedData] = useState("")

  const showIncompletedData = () => { 
    setDataIsIncompleted(true)
    setTimeout(() => { 
      setDataIsIncompleted(false)
    }, 3000)
  }

  const showMissedData = (text) => { 
    setMissedData(true)
    setTextMissedData(text)
    setTimeout(() => { 
      setMissedData(false)
      setTextMissedData("")
    }, 3500)

  }


    useEffect(() => {
      if (inputValue.trim() === '') {
        setFilteredProducts([]);
        setProductoSeleccionado("")
        return;
      }
      const filtered = allProducts.filter((product) =>
        product.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [inputValue, allProducts]);
  
  
    const handleChange = (event) => {
         setInputValue(event.target.value);
         if(event.target.value.length === 0) { 
          setShowProductData(false)
         }
         
    };
  
    const handleItemClick = (product) => {
      console.log(`Producto seleccionado: ${product}`);
      setInputValue(product)
      setProductoSeleccionado(product)
      const selectedName = product;                            
      const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id;
      setProductId(selectedId);
     
    };

  const fechaActual = obtenerFechaActual();

  useEffect(() => {
    axios.get('http://localhost:3000/productos')
         .then((res) => {
           console.log(res.data);
           const allData = res.data
           setProductsAvailable(res.data)
           setAllProducts(allData.map((d) => d.nombre));
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
              categoriaProducto: res.data.categoria
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


    const handleFechaDePagoChange = (e) => {
      const fechaDePagoValue = e.target.value;
      setProductToBuyData((prevState) => ({
        ...prevState,
        fechaPago: fechaDePagoValue,
      }));
    };

    useEffect(() => { 
       console.log(productToBuyData)
    }, [productToBuyData])

    const agregarProducto = () => {
      if(productToBuyData.proveedor === "" || productToBuyData.productoId.length === 0 
      || productToBuyData.fechaPago.length === 0 || productToBuyData.cantidad.length === 0 ||
         productToBuyData.total.length === 0 || productToBuyData.observaciones.length === 0) {
        showMissedData("Faltan datos para agregar el producto a la Compra")
        setInputValue("")
      } else { 
        setShowOrdersChoosen(true)
        setInputValue("")
        setProductToBuyData([])
        setProductosComprados((prevProductos) => [
          ...prevProductos,
          {
            proveedor: productToBuyData.proveedor,
            productoId: productToBuyData.productoId,
            precioProducto: productToBuyData.precioProducto,
            categoriaProducto: productToBuyData.categoriaProducto,
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
          categoriaProducto: '',
          precioProducto: '',
          fechaPago: '',
          observaciones: '',
          cantidad: '',
          total: '',
          nombreProducto: '',
        });
      }
    
    };

    
    const sendMyNewBuy = () => {
      if(productToBuyData.proveedor === "" || productToBuyData.productoId.length === 0 || productToBuyData.fechaPago.length === 0 || productToBuyData.cantidad.length === 0 || productToBuyData.total.length === 0) {
        showMissedData("Debes agregar Productos para asentar una compra")
        setInputValue("")
      } else { 
        const productoActual = {
          proveedor: productToBuyData.proveedor,
          productoId: productToBuyData.productoId,
          precioProducto: productToBuyData.precioProducto,
          categoriaProducto: productToBuyData.categoriaProducto,
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
            setProductosComprados([])
            setProductToBuyData({
              proveedor: '',
              productoId: '',
              categoriaProducto: "",
              precioProducto: '',
              fechaPago: '',
              observaciones: '',
              cantidad: '',
              total: '',
              nombreProducto: '',
            })
            setInputValue("")
          
            setTimeout(() => { 
              document.getElementById('my_modal_23').close();
              setSuccesMessage(false);
              updateList()
              setShowOrdersChoosen(false)
             }, 1500)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };


  const cancelTheBuy = () => {
    setProductosComprados([]);
    setShowProductData(false);
    document.getElementById('my_modal_23').close();
  };

  return (
    <div>
      <Button onClick={() => document.getElementById('my_modal_23').showModal()} className="bg-foreground text-background font-bold cursor-pointer" style={{ backgroundColor: '#60BCFF' }} endContent={<PlusIcon />} size="sm">
        AÑADIR COMPRA
      </Button>
      <dialog id="my_modal_23" className="modal">
        <div className="modal-box bg-white text-black ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">  ✕</button>
          </form>
          <div className="flex flex-col">
            <div className="flex justify-start items-start ">
              <small className="font-bold text-lg" style={{ color: '#5C77A9' }}>   Crear Nueva Compra </small>
            </div>

            <div className="border border-gray-200 mt-2"></div>


           {productExist ? 
             <div className='flex gap-6 mt-4'>
               <button className='text-white text-xs' style={{backgroundColor:"#728EC3"}}>Producto Existente</button>
               <button className='text-white text-xs' style={{backgroundColor:"#A6BBE4"}}>Añadir Producto +</button>
             </div>
           : 
           
           <div className='flex flex-col items-center justify-start mt-4'>
                        <div style={{backgroundColor:"#4F8BE6"}} className='flex justify-between items-center w-full rounded-lg h-12 mt-4 cursor-pointer'>
                            <small className='font-bold text-sm ml-4 text-white' onClick={() => setProductExist(true)}>PRODUCTO EXISTENTE </small>
                            <img className='h-4 w-4 mr-4' src={Arrow}/>
                        </div>
                        <div className=' w-full'>
                          <AddProductModal/>
                        </div>
             </div>}

            <div className="flex flex-col items-center jsutify-center mt-8"> 

              {productExist ? (
                <div className="flex flex-col  gap-2 ">

                  <div className='flex gap-6 items-center justify-center'>
                     <div className="relative">
                      <small className="font-bold text-sm mr-2">Producto</small>
                                      <input type='text' 
                                          value={inputValue} 
                                          onChange={handleChange}  
                                          style={{backgroundColor:"#E6EEFF"}} 
                                          className='h-9 rounded-lg border border-none focus:outline-none  focus:ring-0 w-48 text-sm text-center justify-center' 
                                       />
                                      {filteredProducts.length > 0 && (
                                        <div 
                                            className='options-container absolute z-10 bg-white border rounded-lg mt-1 w-46 items-center jusitfy-center max-h-36 overflow-y-auto'
                                            style={{backgroundColor:"#E6EEFF"}}>
                                          {filteredProducts.map((product, index) => (
                                            productoSeleccionado.length > 1 ? null : (
                                              <div key={index}  className='option-item rounded-lg m-2 cursor-pointer flex flex-col  items-center jusitfy-center' onClick={() => handleItemClick(product)} >
                                                <p className='m-2 text-xs text-black hover:text-white hover:bg-blue-500'>{product}</p>
                                              </div>
                                            )
                                          ))}
                                        </div>
                                      )}                    
                     </div>
                     <div className='flex gap-2 items-center justify-center'>
                       <p className='font-bold text-sm'>Cantidad</p>
                        <input
                          type="number"
                          className="w-16 h-9 rounded-md border border-none focus:outline-none  focus:ring-0"
                          style={{ backgroundColor: '#E6EEFF' }}
                          value={productToBuyData.cantidad}
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
                  </div>

                  <div className='flex items-center justify-start  gap-2 mt-2'>
                    <p className='font-bold text-sm'>Selecciona la fecha de Pago</p>
                    <input className='h-9 border border-none focus:outline-none  focus:ring-0 rounded-lg' type="date"  style={{ backgroundColor: '#E6EEFF' }} value={productToBuyData.fechaPago} onChange={handleFechaDePagoChange}/>
                  </div>

                  <div className='flex items-start justify-start  gap-2 mt-2'>
                    <p className='font-bold text-sm'>Observaciones</p>
                    <textarea className="w-72 border border-none focus:outline-none  focus:ring-0 text-center items-center justify-center rounded-lg"
                        style={{ backgroundColor: '#E6EEFF' }}
                        value={productToBuyData.observaciones}        
                        onChange={(e) => {
                        const observacionesAclaradas = e.target.value;
                        setProductToBuyData((prevState) => ({
                          ...prevState,
                          observaciones: observacionesAclaradas,
                          }));
                          }}
                    />
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

                    {dataIsIncompleted ? <p style={{ color: '#728EC3' }} className="text-sm font-bold">No has agregado ningun Producto</p> : null}

                   

                  {succesMessage ? (
                    <p style={{ color: '#728EC3' }} className="text-sm font-bold">
                      Compra añadida con Éxito
                    </p>
                  ) : (
                    <>
                    <div className='flex flex-col'>
                        <div className="flex gap-6 items-center justify-center mt-4">
                          <button className="w-32 h-9 text-white text-xs font-bold cursor-pointer rounded-xl border border-none" style={{ backgroundColor: '#ACB3C0' }} size="sm" onClick={() => cancelTheBuy()}>
                            Cancelar X
                          </button>
                          <button className="w-32 h-9 text-white text-xs font-bold cursor-pointer rounded-xl border border-none" style={{ backgroundColor: '#728EC3' }} size="sm" onClick={() => agregarProducto()}>
                            Agregar Otro +
                          </button>
                          <button className="w-32 h-9 text-white text-xs font-bold cursor-pointer rounded-xl border border-none" style={{ backgroundColor: '#5074B9' }} size="sm" onClick={() => sendMyNewBuy()}>
                            Finalizar ✔
                          </button>
                        </div>      
                        <div className='mt-10'>
                          {missedData ? 
                          <p style={{ color: '#728EC3' }} className="text-xs font-bold">{textMissedData}</p>
                          :
                          null
                           }
                        </div>
                    </div>
                    
                    </>
              


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

