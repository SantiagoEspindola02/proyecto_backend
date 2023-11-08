// estaRegistrado(idProduct,idPersona){
//     const product = this.getProductById(idProduct)
//     if(product = null){
//         return ['El product no existe']
//     }
//     let registro = product.participantes.find(idParticipante => idParticipante == idPersona)

//     if(registro === undefined){
//         return true
//     }else{
//         return false
//     }
// }

// agregarParticipante(idProduct, idParticipante){
//     const product = this.getProductById(idProduct)
    
//     if(product == null){
//         return ['El product no existe']
//     }
//     if(this.estaRegistrado(idProduct, idParticipante)){
//         product.participantes.push(idParticipante)
//         return product
//     }else{
//         return ['La persona ya esta registrada']
//     }
// }

// ponerEventoEnGira(idProduct, nLocalidad, nFecha){
//     const product = this.getProductById(idProduct)

//     let code_product = (this.getProducts()).length

//     if(!product){
//         return 'El product no existe'
//     }
//     let nuevoEvento = {...product}
//     nuevoEvento.description = nLocalidad
//     nuevoEvento.fecha = nFecha
//     nuevoEvento.code = ++code_product
//     this.products.push(nuevoEvento)
    
//     return products

// }