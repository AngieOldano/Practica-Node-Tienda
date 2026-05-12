const { Producto, Categoria } = require('../models') 


// DEFINIMOS ENDPOINTS

// GET - devolver lista de productos

const obtenerProductos = async (req,res) => { // cuando a la app le llegue una peticion de tipo get ejecuta la funcion
    try {
        //LISTAR PRODUCTOS
        const productos = await Producto.findAll({ // a la funcion le pasamos un obj para filtrar los atributos que queres mostrar
            attributes: ["nombre","precio","stock"],
            include: { // para incluir la categoria a la que pertenece el producto, es como un JOIN en SQL
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"] // solo queremos mostrar el nombre de la categoria    
            }
        }) //devuelve un array de objetos donde cada uno es un producto
        // ahora podemos mandar la respuesta:
        res.status(200).json(productos) //respuesta: mandamos un json con los productos
    } catch (error) {
        res.status(500).json({message: "Error al obtener los productos"}) //respuesta de error
    }
}

// GET - devolver un producto por id
const obtenerProducto = async (req,res) =>{ // cuando a la app le llegue una peticion de tipo get ejecuta la funcion
    const producto = req.producto // el producto que se encontro en el middleware de validacion de id
    res.status(200).json(producto) //respuesta: mandamos un json con el producto encontrado
}




// POST - crear producto
const crearProducto = async (req,res) => {
    try {
        const{nombre, precio, stock, categoriaId} = req.body // van a tener los valores que mande el usuario
    
        //Creamos un producto
        const producto = await Producto.create({
            nombre,
            precio,
            stock,
            categoriaId
        })
        res.status(201).json(producto) // respuesta de creacion con exito
    } catch (error) {
        res.status(500).json({message: "Error al crear el producto"}) //respuesta de error
    }
}



// PUT - actualizar producto
const actualizarProducto = async (req, res) => { // cuando a la app le llegue una peticion de tipo put ejecuta la funcion
    try {
        const { id } = req.params //params para leer los parametros que va a pasar el usuario
        const { nombre, precio, stock, categoriaId } = req.body // body para leer los datos que va a mandar el usuario para actualizar el producto
        const producto = req.producto // el producto que se encontro en el middleware de validacion de id
        await producto.update({ // actualizamos el producto con los datos que mando el usuario
            nombre,
            precio,
            stock,
            categoriaId
        })
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el producto"
        })
    }
}

// DELETE - eliminar producto
const eliminarProducto = async (req, res) => { // cuando a la app le llegue una peticion de tipo delete ejecuta la funcion
    try {
        const { id } = req.params //params para leer los parametros que va a pasar el usuario
        const producto = req.producto // el producto que se encontro en el middleware de validacion de id
        await producto.destroy() // eliminamos el producto encontrado
        res.status(200).json({
            message: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el producto"
        })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}

