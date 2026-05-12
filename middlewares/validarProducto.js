const schemaProducto = require('../schemas/producto.schema') // importamos el esquema de validacion


// Middleware para validar la estructura del producto en el request body
const validarProducto = (req,res,next) =>{ 
    const {error} = schemaProducto.validate(req.body) // validamos el cuerpo de la peticion con el esquema
    if(error){ // si hay un error de validacion
        return res.status(400).json({message: error.details[0].message}) // devolvemos el mensaje del primer error encontrado, el details es un array con todos los errores encontrados, el message es el mensaje de error que se genero
    }        
    // Si pasa la validacion
    next()
}

module.exports =  validarProducto



/* ANTES SIN JOI

const validarProducto = (req,res,next) =>{ 
    const{nombre, precio, stock, categoriaId} = req.body // van a tener los valores que mande el usuario
        // si NO mando alguno de los campos
        if(!nombre || precio == null || stock == null, !categoriaId){ // difentes formas de escribir que no tienen valor
           return res.status(400).json({message:"Faltan campos obligatorios"}) //el return es porque no tiene else
        }
        if(precio <=0){
            return res.status(400).json({message: "El precio debe ser mayor a 0"})
        }
        // Si pasa la validacion
        next()
}

module.exports =  validarProducto


 */