'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Etiqueta.belongsToMany(models.Producto, {
        through: models.ProductoEtiqueta,
        foreignKey: "etiquetaId",
        otherKey: "productoId",
        as: "productos",
      });
    }
  }
  Etiqueta.init({
    nombre: { // podemos agregar mas campos a atributo creando un objeto con las caracteristicas del atributo
      type: DataTypes.STRING,
      allowNull: false //es obligatorio, no puede ser nulo
    },
  }, {
    sequelize,
    modelName: 'Etiqueta',
  });
  return Etiqueta;
};