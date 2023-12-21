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






export const topMoreBoughtProducts = async () => { 
  try {
    const res = await axios.get("http://localhost:3000/compras");
    console.log("Compras", res.data);
    const data = res.data;
    const moreBoughtProducts = {};
   
    data.forEach(compra => {
      compra.productosComprados.forEach(producto => {
        const productName = producto.nombreProducto;
        const cantidadComprada = parseInt(producto.cantidad, 10);

        if (moreBoughtProducts[productName]) { 
          moreBoughtProducts[productName] += cantidadComprada;
        } else { 
          moreBoughtProducts[productName] = cantidadComprada;
        }
      });
    });

    const newArray = Object.keys(moreBoughtProducts).map(nombreProducto => ({ 
      nombreProducto,
      cantidadComprada: moreBoughtProducts[nombreProducto]
    }));

    const orderArray = newArray.sort((a, b) => b.cantidadComprada - a.cantidadComprada);
    const limitJustFive = orderArray.slice(0, 5)

    return limitJustFive;

  } catch (error) {
    console.log(error);
  }
}

export const topProductsWithMoreNetGains = async () => { 
  try {
    const res = await axios.get("http://localhost:3000/venta");
    console.log("ventas", res.data);
    const data = res.data;

    const productsNetGains = {}

    data.forEach(sells => { 
       const productName = sells.nombreProducto;
       const netGain = sells.gananciaNeta;
       if(productsNetGains[productName]) { 
        productsNetGains[productName] += netGain
       } else { 
        productsNetGains[productName] = netGain
       }
    })

    
    const newArray = Object.keys(productsNetGains).map(productName => ({ 
      productName,
      netGain: productsNetGains[productName]
    }));

    const topFive = newArray.slice(0, 5)
    const order = topFive.sort((a, b) => b.netGain - a.netGain)
    return order

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
      throw err; 
    }
  };


  export const getCategorys = async () => { 
    try {
      const response = await axios.get("http://localhost:3000/getAllCategorys")
      const data = response.data
      return data;
    } catch (error) {
       console.log(error)
    }
  }


