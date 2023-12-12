


import { promises as fs } from 'fs'
export default class ProductManager {
    constructor(path) {

        this.path = path
        this.products = []
    }

    async getProducts() {
        try {
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            console.log(productos)
            return productos
        } catch (error) {
            //console.error('Error: ',error)
        }
    }

    async getProductById(pid) {

        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.pid === pid)
        return prod
    }

    async addProduct(product) {

        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        product.pid = this.generateId(products)
        product.status = true;

        products.push(product)

        await fs.writeFile(this.path, JSON.stringify(products))
        return true;
    }
    async updateProduct(pid, product) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = products.findIndex(prod => prod.pid === pid)

        if (index != -1) {

            products[index].title = product.title
            products[index].description = product.description
            products[index].price = product.price
            products[index].thumbnail = product.thumbnail
            products[index].code = product.code
            products[index].stock = product.stock
            products[index].category = product.category

            await fs.writeFile(this.path, JSON.stringify(products))

            return true; 
        } else {
            return false; 
        }
    }

    async deleteProduct(pid) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.pid != pid)
        await fs.writeFile(this.path, JSON.stringify(prods))

        return prods.length < products.length;          
    }

    generateId(products) {

        if (products.length === 0) {
            return 1;
        }
        const maxId = products.reduce((max, prod) => (prod.pid > max ? prod.pid : max), 0);
        return maxId + 1;
    }

}