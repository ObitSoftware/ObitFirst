import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDataBase = () => {
    mongoose.connect(process.env.MONGODB_URL)
      .then(() => { 
        console.log("Conexion exitosa a tu Base de Datos OBITSOFTWARE Gestion de Inventario en la Nube ✔");
      })
      .catch(err => {
        console.log("Error en la conexion a la base de datos en la Nube 👎");
        console.log(err); 
      });
  }
export default connectDataBase;