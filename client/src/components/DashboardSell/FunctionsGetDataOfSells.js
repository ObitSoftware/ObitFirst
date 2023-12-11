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

  export const getMonthGainsByMonth = async (month) => {
    try {
      const response = await axios.get("http://localhost:3000/venta");
      const salesOfMonth = response.data.filter((sale) => {
        const saleDateParts = sale.fechaCreacion.split('/');
        const saleMonth = parseInt(saleDateParts[0], 10); // Log this value
        console.log(saleMonth);
        return saleMonth === month;
      });
    
      const totalGains = salesOfMonth.reduce((sum, sale) => sum + sale.gananciaNeta, 0);
      return totalGains;
    } catch (error) {
      console.error(`Error al obtener las ganancias del mes ${month}:`, error);
      throw error;
    }
  };

  export const getPercentage = async () => { 
    try {
      // Obtener las ganancias del mes actual
      const currentMonthGains = await getMonthGains();
  
      // Obtener las ganancias del mes anterior
      const currentDate = new Date();
      const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1; // Ajustar para diciembre
      const previousMonthGains = await getMonthGainsByMonth(previousMonth);
      console.log(previousMonthGains)
  
      // Calcular el porcentaje de mejora o empeoramiento
      let percentChange;
  
      if (previousMonthGains !== 0) {
        percentChange = ((currentMonthGains - previousMonthGains) / Math.abs(previousMonthGains)) * 100;
      } else {
        // Handle the case where previousMonthGains is zero
        percentChange = currentMonthGains === 0 ? 0 : Infinity; // Set to 0 or Infinity as appropriate
      }
  
      console.log(percentChange);
  
      return {
        currentMonthGains,
        previousMonthGains,
        percentChange
      };
    } catch (error) {
      console.error("Error al obtener la comparación de ganancias:", error);
      throw error;
    }
  };
  
  