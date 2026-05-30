const { Router } = require('express')
const categoriaController = require('../controllers/categorias.controllers')
const router = Router()

router.get('/', categoriaController.obtenerCategorias)
router.post('/', categoriaController.crearCategoria)

module.exports = router

