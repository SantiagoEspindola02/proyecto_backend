


import express from 'express'
import multer from 'multer'
import {engine} from 'express-handlebars'
import { Server } from 'socket.io'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import { __dirname } from './path.js'
import path from 'path'
import ProductManager from './controllers/ProductManager.js'


const app = express()
const PORT = 8080;

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server) 

const productManager = new ProductManager('src/models/products.txt');

//Config

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, 'src/public/img') 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) 
    }
})


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const upload = multer({ storage: storage })

//Conexion con Socket.io

io.on('connection', (socket) => {
    console.log('Conexion con Socket.io');

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        socket.emit('updatedProducts', products);
        socket.emit('mensajeProductoCreado', 'El producto se creó correctamente');
    });
});


app.use('/static', express.static(path.join(__dirname, '/public'))) 
app.use('/api/product',routerProd) 
app.use('/api/carts', routerCart)   


app.get('/static/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        titulo: 'Crear nuevo Producto',
        rutaJS: 'realTimeProducts'
    });
})
