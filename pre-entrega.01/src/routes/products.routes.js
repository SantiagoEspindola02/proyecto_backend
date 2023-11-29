


import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager('src/models/products.txt')

const routerProd = Router()



routerProd.get('/', async (req, res) => {
    const { limit } = req.query

    const prods = await productManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)

})

routerProd.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await productManager.getProductById(parseInt(pid))

    if (prod)
        res.status(200).send(prod)
    else
        res.status(404).send("El Product no existe")
})

routerProd.post('/', async (req, res) => {

    const productData = req.body;

    if (!productData.title || !productData.description || !productData.code || !productData.price || !productData.stock || !productData.category) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const confirm = await productManager.addProduct(productData);

    if (confirm) {
        res.status(201).send('El Product fue agregado correctamente');
    } else {
        res.status(401).send('Error al agregar el producto');
    }

})

routerProd.put('/:pid', async (req, res) => {

    const prodId = parseInt(req.params.pid);

    const confirm = await productManager.updateProduct(prodId, req.body)

    if (confirm)
        res.status(200).send("El Product fue actualizado correctamente")
    else
        res.status(404).send("El Product no fue encontrado")

})

routerProd.delete('/:pid', async (req, res) => {

    const prodId = parseInt(req.params.pid);

    const confirm = await productManager.deleteProduct(prodId)

    if (confirm)
        res.status(200).send("El Product elimino correctamente")
    else
        res.status(404).send("El Product no fue encontrado")
})

export default routerProd