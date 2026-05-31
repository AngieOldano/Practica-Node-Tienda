'use strict'; // activa el modo stricto de js por ejemplo no permite nombre="Juan" (sin el let nombre)
const {
  Model
} = require('sequelize'); //importamos el paquete de sequelize
module.exports = (sequelize, DataTypes) => { // exporta una funcion
  class Producto extends Model {  //creamos la clase producto que en la bdd va a ser la tabla Producto

    static associate(models) { // aca van las relaciones entre Producto con las demas tablas
      Producto.belongsTo(models.Categoria,{ // muchos productos pertenecen a una categoria, es decir que la tabla Producto tiene la clave foranea de Categoria
        foreignKey: "categoriaId",
        as: "categoria" //pronombre
      });
      Producto.belongsToMany(models.Etiqueta, {
        through: models.ProductoEtiqueta, //aca le decimos que la relacion es a traves de la tabla intermedia ProductoEtiqueta
        foreignKey: "productoId", // aca va la del modelo actual (Producto)
        otherKey: "etiquetaId", //aca va la del modelo al que se relaciona (Etiqueta)
        as: "etiquetas",
      });
    }
  }
  Producto.init({ //aca definimos las columnas, podemos hacer cambios o ponerle mas detalles como opcional o no
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
    // se puede crear el id pero si no se hace se hace automaticamente
  }, {
    sequelize, // conexion con la base de datos
    modelName: 'Producto',
  });
  return Producto;
};