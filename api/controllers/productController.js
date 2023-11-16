import Product from '../models/productModel.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}



export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {productName, productDescription, productPrice, productQuantity, productCategory} = req.body


  try {
        Product.findByIdAndUpdate({ _id: productId }, { 
              nombre: productName,
              descripcion: productDescription,
              precio: productPrice,
              cantidad: productQuantity,
              categoria: productCategory
          })
          .then((newProduct) => {                                      
          res.json({message:"The Publication was removed of Favorites", newProduct})
          })
          .catch((err) => { 
          console.log(err)
          })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.status(200).json({ message: 'Producto eliminado correctamente', deleted: deletedProduct });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};


