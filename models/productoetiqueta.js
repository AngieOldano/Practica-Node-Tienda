'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoEtiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // en las M a M no es necesario definir las asociaciones en el modelo intermedio, se definen en los modelos principales (Producto y Etiqueta) con belongsToMany
    }
  }
  ProductoEtiqueta.init({
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etiquetaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductoEtiqueta',
  });
  return ProductoEtiqueta;
};