


import { Router } from 'express';
import CartManager from '../controllers/CartManager.js';


const cartManager = new CartManager('src/models/carts.txt');
const routerCart = Router();

routerCart.get('/', async (req, res) => {

    const { limit } = req.query

    const cart = await cartManager.getCarts()
    const newCart = cart.slice(0, limit)
    res.status(200).send(newCart)

});

routerCart.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(parseInt(cid))

    if (cart)
        res.status(200).send(cart)
    else
        res.status(404).send("El Cart no existente")
})

routerCart.post('/', async (req, res) => {

    const cartData = req.body;

    const confirm = await cartManager.addCart(cartData);

    if (confirm) {
        res.status(201).send('Nuevo carrito agregado');
    } else {
        res.status(401).send('Error al agregar el Cart o este ya existe');
    }

});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid); 
    const productId = parseInt(req.params.pid); 
    const quantity = req.body.quantity || 1;

    const confirm = await cartManager.addProductToCart(cartId, productId, quantity);

    if (confirm) {
        res.status(201).send('Producto agregado correctamente');
    } else {
        res.status(401).send('Error al agregar el producto');
    }
});

export default routerCart;