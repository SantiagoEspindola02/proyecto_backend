class ProductManager {
    #precioBaseDeGanancia = 1.15

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title,description,price){
        let code_product = (this.getProducts()).lenght

        if(!title || !description || !price || !stock){
            return 'Se deben completar todos los campos'
        }

        const codeproducto = this.products.find(producto => producto.code == code)

        if(codeproducto){
            return 'El producto ya esta cargado'
        }

        const product = {
            title: title,
            description: description,
            price: price * this.#precioBaseDeGanancia, 
            stock: 10,
            thumbnail,
            code: ++code_product  
        }

        this.products.push(product)

        return this.products
    }

    getProductById(idProduct){
        let product = this.products.find(producto => producto.code == idProduct)
        if(product){
            return product
        }else{
            return 'Not found'
        }
    }
}