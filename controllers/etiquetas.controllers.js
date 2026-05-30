const { Etiqueta, Producto } = require("../models");

const obtenerEtiquetas = async (req, res) => { // igual que el de categorias pero con el modelo Etiqueta
  try {
    const etiquetas = await Etiqueta.findAll({
      attributes: ["nombre"],
    });
    res.status(200).json(etiquetas);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  } 
};

const crearEtiqueta = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const etiqueta = await Etiqueta.create({
      nombre,
    });
    res.status(201).json(etiqueta);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la etiqueta",
    });
  }
};

module.exports = {
  obtenerEtiquetas,
  crearEtiqueta,
};