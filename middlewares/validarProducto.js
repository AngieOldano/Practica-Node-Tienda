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