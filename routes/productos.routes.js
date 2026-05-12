const { Router } = require('express') // importamos el Router de express para crear las rutas de productos
const productosController = require('../controllers/productos.controllers') // importamos el controlador de productos para manejar las peticiones
const { validarProductoIdConCategoria, validarProductoId } = require('../middlewares/validarProductoId') // importamos el middleware validarProductoId 
const validarProducto = require('../middlewares/validarProducto') // importamos el middleware validarProducto
const router = Router() // creamos una instancia del Router para definir las rutas de productos

router.get('/', productosController.obtenerProductos) // '/' es la ruta base para los productos
router.get('/:id', validarProductoIdConCategoria, productosController.obtenerProducto) // el :id es un parametro dinamico que va a recibir el id del producto que queremos obtener, el middleware validarProductoIdConCategoria se encarga de validar que el id exista y que el producto tenga una categoria asociada, si no cumple con la validacion devuelve un error, si cumple con la validacion pasa al controlador para devolver el producto encontrado
router.post('/', validarProducto, productosController.crearProducto)
router.put('/:id', validarProductoId, validarProducto, productosController.actualizarProducto)
router.delete('/:id', validarProductoId, productosController.eliminarProducto)

module.exports = router

