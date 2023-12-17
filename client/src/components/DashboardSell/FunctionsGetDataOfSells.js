import axios from "axios";

export const getMonthGains = async () => { 
    try {
        const response = await axios.get("http://localhost:3000/venta");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
  
      const salesOfMonth = response.data.filter(sale => {
        const saleDateParts = sale.fechaCreacion.split('/');
        const saleMonth = parseInt(saleDateParts[1], 10); // Convertir a entero
        return saleMonth === currentMonth;
      });

      /*
       const totalGains = salesOfMonth.reduce((sum, sale) => sum + sale.gananciaNeta, 0);
       const formattedTotal = (totalGains).toLocaleString('es-AR') + ' ARS';
       return totalGains;
      */
  
      const totalGains = salesOfMonth.reduce((sum, sale) => sum + sale.gananciaNeta, 0);
      return totalGains;
    } catch (error) {
      console.error("Error al obtener las ganancias del mes:", error);
      throw error;
    }
  };

export const getAllGains = async () => {
    return axios.get("http://localhost:3000/venta")
      .then((res) => {
        const allData = res.data;
        const totalAmount = allData.reduce((acc, sell) => {
          return acc + sell.gananciaNeta;
        }, 0);
  
        return totalAmount; 
      })
      .catch((err) => {
        console.log(err);
        throw err; 
      });
  };

  export const getPreviousMonthGains = async () => {
    try {
      const response = await axios.get("http://localhost:3000/venta");
      const currentDate = new Date();
      
      // Obtener el mes actual
      const currentMonth = currentDate.getMonth() + 1;
  
      // Calcular el mes anterior
      const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  
      const salesOfPreviousMonth = response.data.filter((sale) => {
        const saleDateParts = sale.fechaCreacion.split('/');
        const saleMonth = parseInt(saleDateParts[1], 10); // Convertir a entero
        return saleMonth === previousMonth;
      });
  
      const totalGains = salesOfPreviousMonth.reduce(
        (sum, sale) => sum + sale.gananciaNeta,
        0
      );

      console.log(totalGains)
  
      return totalGains;
    } catch (error) {
      console.error("Error al obtener las ganancias del mes anterior:", error);
      throw error;
    }
  };

  export const getImprovementPercentage = async () => {
    try {
      // Obtener las ganancias del mes actual y del mes anterior
      const currentMonthGains = await getMonthGains();
      const previousMonthGains = await getPreviousMonthGains();
  
      // Calcular el porcentaje de mejora
      const improvementPercentage = ((currentMonthGains - previousMonthGains) / Math.abs(previousMonthGains)) * 100;
      const shortenedPercentage = improvementPercentage.toFixed(1);
      console.log(parseFloat(shortenedPercentage))
      return parseFloat(shortenedPercentage); // Convertir de nuevo a número
  } catch (error) {
      console.error("Error al calcular el porcentaje de mejora:", error);
      throw error;
    }
  };


  

  export const getTotalYearMoneyFactured = async () => { 
  
    try {
      const response = await axios.get("http://localhost:3000/venta");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
  
      const salesOfYear = response.data.filter(sale => {
        const saleDateParts = sale.fechaCreacion.split('/');
        const saleYear = parseInt(saleDateParts[2], 10); // Convertir a entero
        return saleYear === currentYear;
      });
  
      const totalGains = salesOfYear.reduce((sum, sale) => sum + sale.total, 0);
      console.log(totalGains)
      return totalGains;
    } catch (error) {
      console.error("Error al obtener las ganancias del año:", error);
      throw error;
    }
  
}

export const getTotalMonthMoneyFactured = async () => { 
  try {
    const response = await axios.get("http://localhost:3000/venta");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Nota: getMonth() devuelve un índice base 0, por lo que sumamos 1
  
    const salesOfMonth = response.data.filter(sale => {
      const saleDateParts = sale.fechaCreacion.split('/');
      const saleYear = parseInt(saleDateParts[2], 10);
      const saleMonth = parseInt(saleDateParts[1], 10);
      return saleYear === currentYear && saleMonth === currentMonth;
    });
  
    const totalGains = salesOfMonth.reduce((sum, sale) => sum + sale.total, 0);
    console.log(totalGains)
    return totalGains;
  } catch (error) {
    console.error("Error al obtener las ganancias del mes:", error);
    throw error;
  }
}

  export const bestSells = async () => { 
           try {
            const response = await axios.get("http://localhost:3000/venta");
            const orderSells = response.data.sort((a, b) => b.total - a.total);
            const theBestFiveSells = orderSells.slice(0, 5)
            console.log(theBestFiveSells)
            return theBestFiveSells;
          } catch (error) {
            console.error("Error al obtener las ventas:", error);
            throw error;
          }
  } 
  
  