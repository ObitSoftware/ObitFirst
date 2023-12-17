import axios from "axios"
import { useState, useEffect } from "react"

export const getTotalInvertedAmount = async () => {   
      try {
        const res = await axios.get("http://localhost:3000/compras")
        const allPurchase = res.data
        console.log(allPurchase)
        const getTotal = allPurchase.reduce((acc, el) => acc + el.total, 0)
        return getTotal

         } catch (error) {
            console.log(err)
        }
}   

export const getTotalInvertedMonth = async () =>  {  
    try {
        const response = await axios.get("http://localhost:3000/compras");
        console.log(response)
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
  
      const purchaseMonth = response.data.filter(purchase => {
        const purchaseDatePars = purchase.fechaCompra.split('/');
        const purchaseMonthActual = parseInt(purchaseDatePars[1], 10); // Convertir a entero
        return purchaseMonthActual === currentMonth;
      });
  
      const totalBuys = purchaseMonth.reduce((sum, sale) => sum + sale.total, 0);
      console.log(totalBuys)
      return totalBuys;
    } catch (error) {
      console.error("Error al obtener las compras del mes:", error);
      throw error;
    }
}

export const getTopCompras = async () => { 
   try {
     const response = await axios.get("http://localhost:3000/compras");
     const allPurchase = response.data
     const orderBestPurchase = allPurchase.sort((a, b) => b.total - a.total)
     const topFive = orderBestPurchase.slice(0, 5)
     console.log(topFive)
     return topFive

   } catch (error) {
      console.log(error)
   }
}

export const quantityPurchaseOfAllCategorys = async () => { 
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data
    console.log(allPurchase)

    const categoryPurchase = {};

    allPurchase.map((p) => { 
     p.productosComprados.forEach((p) => { 
        const productCategory = p.categoriaProducto;
        if(categoryPurchase[productCategory]) { 
          categoryPurchase[productCategory]++;
        } else { 
          categoryPurchase[productCategory] = 1
        }
      })
    })

    const newArray = Object.keys(categoryPurchase).map((categoriaProducto) => ({
      categoriaProducto,
      cantidad: categoryPurchase[categoriaProducto],
    }));

    console.log("COMPRAS POR CATEGORIA", newArray)
    return(newArray);

  } catch (error) {
     console.log(error)
  }
}

export const getQuantityPurchaseEver = async () => { 
  try {
    const response = await axios.get("http://localhost:3000/compras");
    const allPurchase = response.data
    return(allPurchase.length)
  } catch (error) {
     console.log(error)
  }
}
