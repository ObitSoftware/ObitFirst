
import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddSellModal = ({updateList}) => {

    const actualDate = obtenerFechaActual()
    const [productsAvailable, setProductsAvailable] = useState([])
    const [productId, setProductId] = useState("")
    const [productSelectedData, setProductSelectedData] = useState([])
    const [showProductData, setShowProductData] = useState(false)
    const [quantity, setQuantity] = useState(null)
    const [totalToPay, setTotalToPay] = useState(null)
    const [clientName, setClientName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState("")
    const [missedData, setMissedData] = useState(false)
    const [textMissedData, setTextMissedData] = useState("")

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
      setShowProductData(true)
    };
  

    useEffect(() => { 
            axios.get("http://localhost:3000/productos")
                 .then((res) => { 
                  console.log(res.data)
                  const allData = res.data
                  setProductsAvailable(res.data)
                  setAllProducts(allData.map((d) => d.nombre));
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

      const calcularGananciaNeta = (precioVenta, precioCompra, cantidad) => {
        const gananciaPorUnidad = precioVenta - precioCompra;
        const gananciaNeta = gananciaPorUnidad * cantidad;
        return gananciaNeta;
      };


      const addNewSell = () => { 
        if(productoSeleccionado.length === 0 || clientName.length === 0 || quantity.length === 0 ) { 
          showMissedData("Faltan datos para poder agregar la venta. Por favor, completa todos los campos")
          setTimeout(() => { 
                setClientName("")
                setInputValue("")
                setQuantity(0)
                setProductId("")
                setProductSelectedData([])
                setShowProductData(false)
                setTotalToPay("")
          }, 3500) 
        } else { 
          const dataOfSell = ({ 
            idProducto: productSelectedData._id,
            nombreProducto: productSelectedData.nombre,
            nombreCliente: clientName,
            precio: productSelectedData.precio,
            cantidad: quantity,
            total: quantity * productSelectedData.precio,
            gananciaNeta: calcularGananciaNeta(productSelectedData.precio, productSelectedData.precioCompra, quantity),
            fechaCreacion: actualDate
          })
          axios.post("http://localhost:3000/venta", dataOfSell)
               .then((res) => { 
                console.log(res.data)
                setSuccesMessage(true)
                setClientName("")
                setInputValue("")
                setQuantity(0)
                setProductId("")
                setProductSelectedData([])
                setShowProductData(false)
                setTotalToPay("")
                setTimeout(() => { 
                  document.getElementById('my_modal_3').close();
                  setSuccesMessage(false)
                  updateList()
                 }, 1500)
               })
               .catch((err) => { 
                console.log(err)
               })
        }
      }

    <style>
      {`
        .custom-select option:hover {
          background-color: #728EC3;
          color: white; 
          cursor: pointer
        }
      `}
    </style>



  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR VENTA </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white text-black">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setProductId(null)}>✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nueva Venta</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>

                    <div className='flex flex-col  mt-6'>
                        <div className='flex items-center gap-8 '> 
                          <div className='flex  gap-2 items-center'>
                             <small className='font-bold text-sm'>Producto</small>

                               <div className='relative'>
                                  <input type='text' 
                                          value={inputValue} 
                                          onChange={handleChange}  
                                          style={{backgroundColor:"#E6EEFF"}} 
                                          className='h-9 rounded-lg border border-none focus:outline-none  focus:ring-0 w-48 text-sm text-center justify-center' 
                                  />
                                      {filteredProducts.length > 0 && (
                                        <div className='options-container absolute z-10 bg-white border rounded-lg mt-1 w-46 items-center jusitfy-center' style={{backgroundColor:"#E6EEFF"}}>
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
                          </div>

                          <div className='flex gap-2 text-center items-center'>
                              <p className='font-bold text-sm'>Cantidad</p>
                              <input type="number" className='w-16 h-9 rounded-md' value={quantity}  onChange={(e) => setQuantity(e.target.value)}/>
                          </div>
                        </div>  

                        <div className='flex justify-start items-center text-center mt-4 gap-4'>
                          <p className='font-bold text-sm'>Nombre del Cliente</p>
                          <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' 
                                        style={{backgroundColor:"#E6EEFF"}} 
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                          />  
                        </div>
                        {showProductData ? (
                          
                          <div className='flex justify-between '>
                              <div key={productSelectedData._id} className='flex flex-col items-start justify-center mt-6 '>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Stock del producto:</small>
                                     <p className='text-xs'>{productSelectedData.stock}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Proveedor del producto:</small>
                                     <p className='text-xs'>{productSelectedData.proveedor}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Precio por unidad:</small>
                                     <p className='text-xs'>{productSelectedData.precio} $</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Precio de Costo:</small>
                                     <p className='text-xs'>{productSelectedData.precioCompra} $</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Descripcion:</small>
                                     <p className='text-xs'>{productSelectedData.descripcion}</p>
                                  </div>   
                               </div>
                               
                               <div className=''>
                                 <p className='text-sm font-bold mt-20'>Total: {quantity * productSelectedData.precio} $</p>
                               </div>
                          </div> 

                         
                         ) : null}
                   </div>

                   <div className='flex justify-center items-center w-full mt-8'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addNewSell()}>Añadir Venta </Button>
                   </div>

                   {missedData ? 
                        <div className="flex flex-col items-center text-center justify-center mt-10">
                            <p style={{color:"#728EC3"}} className="text-sm font-bold">{textMissedData}</p>
                        </div> 
                        :
                        null
                    }

                  {succesMessage ? <div className='flex justify-center items-center w-full mt-8'>
                     <p style={{color:"#728EC3"}} className="font-bold text-md mb-6">Venta asentada con Exito ✔</p>
                   </div> : null}

              
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddSellModal;


/*
import React from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../icons/PlusIcon'
import axios from 'axios'
import { useState, useEffect } from 'react'
import obtenerFechaActual from "../../functions/actualDate.js"
import { v4 as uuidv4 } from 'uuid';


const AddSellModal = ({updateList}) => {

    const [productsAvailable, setProductsAvailable] = useState([])
    const [productId, setProductId] = useState("")
    const [productSelectedData, setProductSelectedData] = useState([])
    const [showProductData, setShowProductData] = useState(false)
    const [quantity, setQuantity] = useState(null)
    const [totalToPay, setTotalToPay] = useState(null)
    const [clientName, setClientName] = useState("")
    const [succesMessage, setSuccesMessage] = useState(false)
    
    const actualDate = obtenerFechaActual()

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


      const addNewSell = () => { 
        const dataOfSell = ({ 
          idProducto: productSelectedData._id,
          nombreProducto: productSelectedData.nombre,
          nombreCliente: clientName,
          precio: productSelectedData.precio,
          cantidad: quantity,
          total: quantity * productSelectedData.precio,
          fechaCreacion: actualDate
        })
        axios.post("http://localhost:3000/venta", dataOfSell)
             .then((res) => { 
              console.log(res.data)
              setSuccesMessage(true)
              setClientName("")
              setProductId("")
              setProductSelectedData([])
              setShowProductData(false)
              setTotalToPay("")
              setTimeout(() => { 
                document.getElementById('my_modal_3').close();
                setSuccesMessage(false)
                updateList()
               }, 1500)
             })
             .catch((err) => { 
              console.log(err)
             })
      }

<style>
  {`
    .custom-select option:hover {
      background-color: #728EC3;
      color: white; 
      cursor: pointer
    }
  `}
</style>



  return (
    <div>
      <Button onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR VENTA </Button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setProductId(null)}>✕</button>
            </form>
            <div className='flex flex-col'>
                <div className='flex justify-start items-start '>
                  <small className='font-bold text-lg' style={{color:"#5C77A9"}}>Crear Nueva Venta</small>
                </div>
                <div className='border border-gray-200 mt-2'></div>

                    <div className='flex flex-col  mt-6'>
                        <div className='flex items-center gap-8 '> 
                          <div className='flex gap-2 items-center'>
                            <small className='font-bold text-sm'>Producto</small>
                                <select 
                                  className="h-9 rounded-lg border border-none w-48 text-sm text-center justify-center cursor-pointer" 
                                  style={{backgroundColor:"#E6EEFF"}}
                                    display="flex" 
                                    onChange={(e) => {
                                    const selectedName = e.target.value;                            
                                    const selectedId = productsAvailable.find((p) => p.nombre === selectedName)._id;
                                    setProductId(selectedId);
                                    value={productId}
                                    }}
                                  >
                                    <option disabled selected> Seleccionar Producto</option>
                                  {productsAvailable.map((p) => (
                                      <>  
                                        <option className="custom-option cursor-pointer" key={p._id}>{p.nombre}</option>
                                      </>
                                  ))}
                                </select>
                          </div>

                          <div className='flex gap-2 text-center items-center'>
                              <p className='font-bold text-sm'>Cantidad</p>
                              <input type="number" className='w-16 h-9 rounded-md' value={quantity}  onChange={(e) => setQuantity(e.target.value)}/>
                          </div>
                        </div>  

                        <div className='flex justify-start items-center text-center mt-4 gap-4'>
                          <p className='font-bold text-sm'>Nombre del Cliente</p>
                          <input type="text" className='h-9 rounded-lg border border-none w-44 text-sm text-center justify-center' 
                                        style={{backgroundColor:"#E6EEFF"}} 
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                          />  
                        </div>
                        {showProductData ? (
                          
                          <div className='flex justify-between '>
                              <div key={productSelectedData._id} className='flex flex-col items-start justify-center mt-6 '>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Stock del producto:</small>
                                     <p className='text-xs'>{productSelectedData.stock}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Proveedor del producto:</small>
                                     <p className='text-xs'>{productSelectedData.proveedor}</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Precio por unidad:</small>
                                     <p className='text-xs'>{productSelectedData.precio} $</p>
                                  </div>
                                  <div className='flex gap-2  text-center items-center'>
                                     <small className='font-bold'>Descripcion:</small>
                                     <p className='text-xs'>{productSelectedData.descripcion}</p>
                                  </div>   
                               </div>
                               
                               <div className=''>
                                 <p className='text-sm font-bold mt-20'>Total: {quantity * productSelectedData.precio} $</p>
                               </div>
                          </div> 

                         
                         ) : null}
                   </div>

                   <div className='flex justify-center items-center w-full mt-8'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => addNewSell()}>Añadir Venta </Button>
                   </div>

                  {succesMessage ? <div className='flex justify-center items-center w-full mt-8'>
                     <p style={{color:"#728EC3"}} className="font-bold text-md mb-6">Venta asentada con Exito ✔</p>
                   </div> : null}

              
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default AddSellModal;


*/