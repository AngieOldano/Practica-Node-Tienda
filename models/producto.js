'use strict'; // activa el modo stricto de js por ejemplo no permite nombre="Juan" (sin el let nombre)
const {
  Model
} = require('sequelize'); //importamos el paquete de sequelize
module.exports = (sequelize, DataTypes) => { // exporta una funcion
  class Producto extends Model {  //creamos la clase producto que en la bdd va a ser la tabla Producto

    static associate(models) { // aca van las relaciones entre Producto con las demas tablas
      Producto.belongsTo(models.Categoria,{
        foreignKey: "categoriaId",
        as: "categoria" //pronombre
      })
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