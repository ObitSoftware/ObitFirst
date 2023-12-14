import axios from "axios";


export const quantityOfProducts =  async () => { 
      try {
        const response =  await axios.get("http://localhost:3000/productos");
        console.log(response.data)
        const allProducts = response.data
        const quantity = allProducts.length
        return quantity
      } catch (error) {
        console.error(err);
        throw err;
      }
};


export const calcularMontoTotal = async () => { 
  try {
    const peticion = await axios.get("http://localhost:3000/productos");
    const products = peticion.data;
    console.log(products)
    const newArray = [];

    products.forEach((p) => { 
      const montoTotal = p.precioCompra * p.stock;
      const nombreProducto = p.nombre;
      newArray.push({
        nombreProducto: nombreProducto,
        montoTotalGastado: montoTotal.toString(), 
      });
    });
    console.log(newArray)
    const montoTotalEnPesosActual = newArray.reduce((acumulador, elemento) => { 
       return acumulador + parseInt(elemento.montoTotalGastado, 10);
    }, 0)
    return montoTotalEnPesosActual

  } catch (error) {
    console.log(error);
  }
}


export const getQuantityProductsCategory  = async () => { 
  try {
    const productsQuery = await axios.get("http://localhost:3000/productos");
    const allProducts = productsQuery.data;
    console.log(allProducts);
    
    const categoryCount = {};

    allProducts.forEach((p) => { 
      const productCategory = p.categoria;
      if (categoryCount[productCategory]) {
        categoryCount[productCategory]++;
      } else {
        categoryCount[productCategory] = 1;
      }
    });

    const newArray = Object.keys(categoryCount).map((categoria) => ({
      categoria,
      cantidad: categoryCount[categoria],
    }));

    return(newArray);
  } catch (error) {
    console.log(error);
  }
}

export const getHistoricGainsOfProduct = async () => { 
    try {
      const res = await axios.get("http://localhost:3000/venta");
      console.log("Productos", res.data);
      
      const data = res.data;       
      const gananciaNetaPorProducto = {};
      
      data.forEach(venta => {
        const { nombreProducto, gananciaNeta } = venta;
        if (gananciaNetaPorProducto[nombreProducto]) {
          gananciaNetaPorProducto[nombreProducto] += gananciaNeta;
        } else {
          gananciaNetaPorProducto[nombreProducto] = gananciaNeta;
        }
      });           
      
      const resultado = Object.keys(gananciaNetaPorProducto).map(nombreProducto => ({
        nombreProducto,
        gananciaNetaTotal: gananciaNetaPorProducto[nombreProducto],
      }));
      
      console.log(resultado);
      return resultado;
    } catch (err) {
      console.error(err);
      throw err; // Re-lanza el error para que sea manejado por el bloque catch del componente que llama a esta función
    }
  };

