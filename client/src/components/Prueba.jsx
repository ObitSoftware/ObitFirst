import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prueba = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3000/productos')
         .then((res) => {
                const allData = res.data;
                setAllProducts(allData.map((d) => d.nombre));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
  };


  const handleItemClick = (product) => {
    console.log(`Producto seleccionado: ${product}`);
    setInputValue(product)
    setProductoSeleccionado(product)
  };



  return (
    <div className='flex flex-col items-center justify-center'>
        <h1>Busca tu Producto</h1>
        <input type='text'  value={inputValue} onChange={handleChange} className='w-46 h-8 rounded-lg' placeholder='Escribe para buscar productos' />

        {filteredProducts.length > 0 && (
            <div className='options-container'>
                {filteredProducts.map((product, index) => (
                   productoSeleccionado.length > 1 ? null : (
                    <div key={index} className='option-item border-b rounded-lg m-2' onClick={() => handleItemClick(product)}>
                       <p className='m-2 '>{product}</p>
                    </div>
                   )
                 ))}
             </div>
         )}
     </div>
  );
};

export default Prueba;
