import axios from "axios";



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