import axios from "axios"



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