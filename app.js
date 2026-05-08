const express = require('express') //importamos el paquete express
const app =  express() // representa a toda nuestra app
const db = require('./models/index') // importa del index el objeto db que contiene todos los modelos
const {Producto} = require('./models') // importa el modelo producto
const PORT = 3000 // numero de puerto donde escucha la app


app.use(express.json()) // para que la app pueda leer el JSON que va a mandar el usuario para crear los productos en el POST

// DEFINIMOS ENDPOINTS

// GET - devolver lista de productos
app.get('/productos', async (req,res)=>{ // cuando a la app le llegue una peticion de tipo get ejecuta la funcion
    try {
        //LISTAR PRODUCTOS
        const productos = await Producto.findAll() //devuelve un array de objetos donde cada uno es un producto
        // ahora podemos mandar la respuesta:
        res.status(200).json(productos) //respuesta: mandamos un json con los productos
    } catch (error) {
        res.status(500).json({message: "Error al obtener los productos"}) //respuesta de error
    }
})




// POST - crear producto
// aca necesitamos de un req
app.post('/productos', async (req,res)=>{ 
    try {
        const{nombre, precio, stock} = req.body // van a tener los valores que mande el usuario
        // si NO mando alguno de los campos
        if(!nombre || precio == null || stock == null){ // difentes formas de escribir que no tienen valor
           return res.status(400).json({message:"Faltan campos obligatorios"}) //el return es porque no tiene else
        }
        //Creamos un producto
        const producto = await Producto.create({
            nombre,
            precio,
            stock
        })
        res.status(201).json(producto) // respuesta de creacion con exito
    } catch (error) {
        res.status(500).json({message: "Error al crear el producto"}) //respuesta de error
    }
})




app.listen(PORT, async()=>{
    await db.sequelize.sync() //conexion con la bdd 
    console.log("La aplicacion esta corriendo en el puerto " + PORT)
}) // la aplicacion escucha peticiones del puerto, le pasamos tambien una funcion con console.log

