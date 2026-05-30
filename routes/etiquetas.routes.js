const { Router } = require("express"); // importamos el router de express 
const etiquetasController = require("../controllers/etiquetas.controllers"); // importamos el controlador de etiquetas
const router = Router(); // creamos una instancia del router para definir las rutas de etiquetas

router.get("/", etiquetasController.obtenerEtiquetas);
router.post("/", etiquetasController.crearEtiqueta);

module.exports = router;
