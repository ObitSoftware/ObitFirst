import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import  productRoutes from './routes/productRoutes';
import  ventaRoutes from './routes/ventaRoutes';
import  userRoutes from './routes/userRoutes';
import  proveedorRoutes from './routes/proveedorRoutes';
import  connectDataBase from './database/connectdb.js';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(express.text())
app.use(cors())

app.use('/productos', productRoutes);
app.use('/venta', ventaRoutes);
app.use('/usuario', userRoutes);
app.use('/proveedores', proveedorRoutes);


app.get('/', (req, res) => {
  res.send('OBIT SOFTWARE API IS CORRECTRY UPLOAD')
})

app.listen(port, () => {
  console.log(`El servidor de OB-IT SOSFTWARE esta funcionando correctamente en el puerto ${port} ✔✔`)
  connectDataBase()  
})
