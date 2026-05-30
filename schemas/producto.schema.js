const Joi = require('joi') // importamos Joi para crear el esquema de validacion

const schemaCategoria = Joi.object({ // esquema de validacion para la categoria
    // campos
    idCategoria: Joi.number()
        .integer()
        .positive()
        .required()
})

const schemaProducto = Joi.object({ // tiene que ser un objeto
    categoria: schemaCategoria.required(), // el producto tiene que tener una categoria que cumpla con el esquema de categoria

    nombre: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({ // personalizacion de los mensajes de error
            "string.base": "El nombre debe ser un texto",
            "string.empty": "El nombre no puede estar vacio",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre no puede tener mas de 100 caracteres",
            "any.required": "El nombre es obligatorio"

        }),
    precio: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "El precio debe ser un numero",
            "number.empty": "El precio no puede estar vacio",
            "number.integer": "El precio debe ser un numero entero",
            "number.positive": "El precio debe ser un numero positivo",
            "any.required": "El precio es obligatorio"
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "El stock debe ser un numero",
            "number.empty": "El stock no puede estar vacio",
            "number.integer": "El stock debe ser un numero entero",
            "number.min": "El stock no puede ser negativo",
            "any.required": "El stock es obligatorio"
        }),
    idCategoria: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "El ID de categoria debe ser un numero",
            "number.empty": "El ID de categoria no puede estar vacio",
            "number.integer": "El ID de categoria debe ser un numero entero",
            "number.positive": "El ID de categoria debe ser un numero positivo",
            "any.required": "El ID de categoria es obligatorio"
        })
})

const schemaProductos = Joi.array().items(schemaProducto).min(1).required()

module.exports = {
    schemaProducto, // exportamos el esquema para poder usarlo en el middleware de validacion
    schemaProductos
}   