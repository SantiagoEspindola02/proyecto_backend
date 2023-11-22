



import { promises as fs } from 'fs'
export default class ProductManager {
    constructor(path) {

        this.path = path
        this.products = []
    }

    async getProducts() {
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return products
        } catch (error) {
        }
    }

    async getProductById(id) {

        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(producto => producto.id === id)
        if (product) {
            console.log(product)
        } else {
            console.log("Producto no existe")
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
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct(id) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.filter(producto => producto.id != id)
        await fs.writeFile(this.path, JSON.stringify(product))
    }
}
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
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
const product1 = new Product("nike 1", "zapatillas para correr", 100, "/zapatillas/nike1", "a200", 10)
const product2 = new Product("jordan retro", "zapatillas de coleccion", 250, "/zapatillas/jordanretro", "a201", 15)
const product3 = new Product("nike 720", "zapatillas para salir", 300, "/zapatillas/nike720", "a202", 20)
const product4 = new Product("nike 97", "zapatillas de vestir", 200, "/zapatillas/nike97", "a203", 17)

//console.log(product1)
//console.log(product2)

const productManager = new ProductManager('../products.txt')

productManager.addProduct(product1)
productManager.addProduct(product3)

//console.log(productManager.getProducts())