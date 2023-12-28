import axios from "axios"

function obtenerFechaActual() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}

// Función para obtener todas las compras
const allPurchaseNow = async () => { 
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data;
    return allPurchase;
  } catch (error) {
    console.log(error);
  }
};


export const getAllProviders = async () => { 
   try {
      const response = await axios.get("http://localhost:3000/proveedores")
      const data = response.data
      console.log("PROVEEDORES", data)
      return data
   } catch (error) {
      console.log(error)
   }
}

export const totalMoneySpentBySupplier = async () => {
    try {
      const response = await axios.get("http://localhost:3000/compras");
      const allPurchase = response.data;
      console.log(allPurchase);
  
      const supplierTotalSpent = {};
  
      allPurchase.forEach((purchase) => {
        purchase.productosComprados.forEach((product) => {
          const supplierName = product.proveedor;
          const productPrice = product['precioProducto'];
  
          if (supplierTotalSpent[supplierName]) {
            supplierTotalSpent[supplierName].monto += productPrice;
          } else {
            supplierTotalSpent[supplierName] = { nombre: supplierName, monto: productPrice };
          }
        });
      });
  
      const resultArray = Object.values(supplierTotalSpent);
      console.log("TOTAL GASTADO POR PROVEEDOR", resultArray);
      return resultArray;
  
    } catch (error) {
      console.log(error);
    }
  };

  export const topProvidersByNetGains = async () => {
    try {
        const response = await axios.get("http://localhost:3000/venta");
        const allSells = response.data;
        console.log(allSells);

        const supplierTotalGain = {};

        allSells.forEach((sell) => { 
            const providerName = sell.proveedorProducto;
            const netGain = sell.gananciaNeta;

            if(supplierTotalGain[providerName]) { 
                supplierTotalGain[providerName].gananciaNeta += netGain;
                supplierTotalGain[providerName].detalleVenta.push(sell);
            } else {
                supplierTotalGain[providerName] = {
                    nombre: providerName,
                    gananciaNeta: netGain,
                    detalleVenta: [sell]  
                };
            }
        });

        const resultArray = Object.values(supplierTotalGain);
        const orderByAmount = resultArray.sort((a, b) => b.gananciaNeta - a.gananciaNeta);
        return orderByAmount;
    
    } catch (error) {
        console.log(error);
    }
};

export const quantityPurchaseOfAllProviders = async () => { 
    try {
      const response = await axios.get("http://localhost:3000/compras");
      const allPurchase = response.data;
      console.log(allPurchase);
  
      const categoryPurchase = {};
  
      allPurchase.forEach((purchase) => { 
        purchase.productosComprados.forEach((product) => { 
          const productCategory = product.proveedor[0];
          const quantity = parseInt(product.cantidad, 10);
  
          if (categoryPurchase[productCategory]) { 
            categoryPurchase[productCategory] += quantity;
          } else { 
            categoryPurchase[productCategory] = quantity;
          }
        });
      });
  
      const newArray = Object.keys(categoryPurchase).map((proveedor) => ({
        proveedor,
        cantidad: categoryPurchase[proveedor],
      }));
  
      console.log("COMPRAS POR PROVEEDOR", newArray);
      return newArray;
  
    } catch (error) {
      console.log(error);
    }
  }

  
export const quantityPurchaseOfAllProvidersByMonth = async (month) => { 
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data;
    console.log(allPurchase);

    const categoryPurchase = {};

    allPurchase.forEach((purchase) => { 
      purchase.productosComprados.forEach((product) => { 
        const productCategory = product.proveedor[0];
        const quantity = parseInt(product.cantidad, 10);

        if (categoryPurchase[productCategory]) { 
          categoryPurchase[productCategory] += quantity;
        } else { 
          categoryPurchase[productCategory] = quantity;
        }
      });
    });

    const newArray = Object.keys(categoryPurchase).map((proveedor) => ({
      proveedor,
      cantidad: categoryPurchase[proveedor],
    }));

    console.log("COMPRAS POR PROVEEDOR", newArray);
    return newArray;

  } catch (error) {
    console.log(error);
  }
}

export const getQuantityInvertedAndQuantityGains = async () => { 
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data;
    console.log(allPurchase);

    const providerAmount = {};

    allPurchase.forEach((purchase) => { 
      purchase.productosComprados.forEach((p) => { 
        const providerName = p.proveedor[0]
        const amountInverted = p["total"];

        if(providerAmount[providerName]) { 
          providerAmount[providerName].total += amountInverted
        } else { 
          providerAmount[providerName] = {nombre: providerName, monto: amountInverted}
        }
      })
    })

      const resultArray = Object.values(providerName)
      console.log("INVERSION POR PROVEEDOR", resultArray);
      return resultArray;
    
  } catch (error) {
    console.log(error);
  }
}


export async function nextPaymentDates() {
  const allPurchase = await allPurchaseNow(); 
  const actualDate = obtenerFechaActual(); 

  const currentDate = new Date(actualDate.split('/').reverse().join('-'));


  const comprasOrdenadas = allPurchase.sort((a, b) => {
    const fechaPagoA = new Date(a.productosComprados[0].fechaPago);
    const fechaPagoB = new Date(b.productosComprados[0].fechaPago);
    return fechaPagoA - fechaPagoB;
  });

  const comprasProximas = comprasOrdenadas
    .filter(compra => {
      const fechaPago = new Date(compra.productosComprados[0].fechaPago);
      return fechaPago >= currentDate;
    })
    .slice(0, 5);

  const resultados = comprasProximas.map(compra => ({
    proveedor: compra.productosComprados[0].proveedor[0],
    producto: compra.productosComprados[0].nombreProducto,
    fechadepago: compra.productosComprados[0].fechaPago,
    cantidad: compra.productosComprados[0].cantidad
  }));

  console.log(resultados)
  return resultados;
}

