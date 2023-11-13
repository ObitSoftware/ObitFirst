import  express from 'express';
import  mongoose from 'mongoose';
import  productRoutes from './routes/productRoutes';
import  ventaRoutes from './routes/ventaRoutes';
import userRoutes from './routes/userRoutes';
import proveedorRoutes from './routes/proveedorRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error de conexión a la base de datos', err));

// Rutas
app.use('/productos', productRoutes);
app.use('/venta', ventaRoutes);
app.use('/usuario', userRoutes);
app.use('/proveedores', proveedorRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
