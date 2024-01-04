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


export const nextPaymentDates = async () => {
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data;
    const paymentData = {};

    allPurchase.forEach((purchase) => {
      purchase.productosComprados.forEach((p) => {
        const providerName = p.proveedor[0];
        const paymentDate = p.fechaPago;

        if (!paymentData[providerName]) {
          paymentData[providerName] = {
            provider: providerName,
            product: p.nombreProducto,
            paymentDates: [],
          };
        }
        paymentData[providerName].paymentDates.push(paymentDate);
      });
    });

    // Calcular la diferencia entre la fecha actual y las fechas de pago
    const currentDate = new Date();

    // Ordenar las fechas de pago para cada compra según su proximidad a la fecha actual
    Object.values(paymentData).forEach((data) => {
      data.paymentDates.sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);

        return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
      });

      // Seleccionar las 5 fechas más cercanas
      data.paymentDates = data.paymentDates.slice(0, 5);
    });

    const result = Object.values(paymentData);
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

