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
      console.log("TOTAL SPENT BY SUPPLIER", resultArray);
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
        const topFive = orderByAmount.slice(0, 5);
        console.log("JUJUJU:", topFive);
        return topFive;
    
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


/*
 const fetchVentaData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/venta");
        const monthName = props.month.toLowerCase(); // Convertir a minúsculas
        const monthNumber = getMonthNumber(monthName);
  
        const productosVendidos = res.data
          .filter(venta => {
            const fechaVenta = venta.fechaCreacion;
            const dateParts = fechaVenta.split("/");
            if (dateParts.length === 3) {
              const ventaMonth = parseInt(dateParts[1], 10);
              return ventaMonth === monthNumber;
            } else {
              console.error(`Fecha de venta con formato inesperado: ${fechaVenta}`);
              return false;
            }
          })
          .reduce((acc, venta) => {
            const nombreProducto = venta.nombreProducto;
            const cantidadVendida = venta.cantidad || 0;
            const index = acc.findIndex((producto) => producto.NombreProducto === nombreProducto);
            if (index !== -1) {
              acc[index].CantidadVendida += cantidadVendida;
            } else {
              acc.push({
                NombreProducto: nombreProducto,
                CantidadVendida: cantidadVendida
              });
            }
            return acc;
          }, []);
  
        productosVendidos.sort((a, b) => b.CantidadVendida - a.CantidadVendida);
        setRankingProductos(productosVendidos);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchVentaData();*/