const { Router } = require('express')
const productosController = require('../controllers/productos.controllers')
const validarProducto = require('../middlewares/validarProducto')
const { validarProductoIdConCategoria, validarProductoId } = require('../middlewares/validarProductoId')
const router = Router()

router.get('/', productosController.obtenerProductos)
router.get('/:id', validarProductoIdConCategoria, productosController.obtenerProducto)
router.post('/', validarProducto, productosController.crearProducto)
router.put('/:id', validarProductoId, validarProducto, productosController.actualizarProducto)
router.delete('/:id', validarProductoId, productosController.eliminarProducto)

module.exports = router

