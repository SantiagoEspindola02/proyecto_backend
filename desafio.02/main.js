import { promises as fs } from 'fs'
class ProductManager {
    constructor(path) {

        this.path = path
        this.products = []
    }

    async getProducts() {
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            console.log(products)
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    async getProductById(id) {

        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(producto => producto.id === id)
        if (product) {
            console.log(product)
        } else {
            console.log("El producto no existe")
        }
    }

    async addProduct(product) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }

        products.push(product)

        await fs.writeFile(this.path, JSON.stringify(products))
    }

    async updateProduct(id, name) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = products.findIndex(product => product.id === id)

        if (index != -1) {

            products[index].title = name
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("No se encontro el producto")
        }
    }

    async deleteProduct(id) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.filter(producto => producto.id != id)
        await fs.writeFile(this.path, JSON.stringify(product))
    }
}

class Product {
    constructor(title, descripcion, price, thumbnail, code, stock) {
        this.title = title
        this.descripcion = descripcion
        this.price = price
        this.stock = stock
        this.thumbnail = thumbnail
        this.code = code
        this.id = Product.incrementId()
    }

    static incrementId() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const product1 = new Product("moto zanella", "patagonia eagle 150", 1000000, "nico", "3", 1000)
const product2 = new Product("moto mondial", "mondial 250", 2000000, "leo", "4", 500)

//console.log(product1)
//console.log(product2)

const productManager = new ProductManager('/products.txt')

productManager.addProduct(product1);
productManager.addProduct(product2);

    