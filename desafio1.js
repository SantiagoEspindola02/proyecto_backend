class ProductManager {
    #precioBaseDeGanancia = 1.15

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct( title, description, price, thumbnail, code, stock ){
        let id_product = (this.getProducts()).lenght

        if( !title || !description || !price || !thumbnail || !code || !stock ){
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
            stock: stock,
            thumbnail: thumbnail,
            code: code,
            id: ++id_product  
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

const productManager = new ProductManager()

let products = productManager.addProduct( "remera", "hecha para usar dias de verano", 5000, "neogivnwn", "a100", 50 )
// products = productManager.addProduct( "remera", 5000, "a100", 50 )
// products = productManager.addProduct( "abrigo", "hecho para usar dias de invierno", 15000, "alkcmmk", "a100", 20 )
// products = productManager.addProduct( "pantalon", "hecha para usar dias de primavera", 10000, "poiuymj", "a102", 30 )

console.log(products)
