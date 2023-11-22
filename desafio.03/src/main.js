



import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 6000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('./products.txt');

app.get('/', (req, res) => {
  res.send("Hola desde el inicio de mi app");
});

app.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const limit = parseInt(req.query.limit);
  
      if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/products/:pid', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const productId = parseInt(req.params.pid);
  
      if (!isNaN(productId)) {
        const product = products.find(producto => producto.id === productId);
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } else {
        res.status(400).json({ error: 'ID Invalido' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.get('*', (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});