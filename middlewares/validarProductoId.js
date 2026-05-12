const { Producto, Categoria } = require('../models') // importamos el modelo de producto y categoria para hacer las consultas a la bdd

// validacion para que el producto exista en la bdd por medio del id que se le pasa por params
const validarProductoId = async (req, res, next) =>{
    try {
        const { id } = req.params
        const producto = await Producto.findByPk(id)
        if (!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        req.producto = producto // guardamos el producto en el objeto req para que pueda ser usado en el controlador
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el producto"
        })
    }
}

// validacion para que el id del producto exista en la bdd y que el producto tenga una categoria asociada
const validarProductoIdConCategoria = async (req, res, next) =>{
    try {
        const { id } = req.params
        const producto = await Producto.findByPk(id, {
            attributes: ["nombre","precio","stock"],
            include: {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"]
            }
        })
        if (!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        req.producto = producto
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el producto"
        })
    }
}

module.exports = {
    validarProductoIdConCategoria,
    validarProductoId
}