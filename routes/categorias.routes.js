const { Router } = require('express')
const categoriaController = require('../controllers/categoria.controllers')
const router = Router()

router.get('/', categoriaController.obtenerCategorias)
router.post('/', categoriaController.crearCategoria)

module.exports = router

