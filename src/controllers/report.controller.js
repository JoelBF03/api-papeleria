const DetalleVenta = require("../models/DetalleVenta");
const Producto = require("../models/Article");
const ReporteDiario = require("../models/Report");

async function obtenerReportes(req, res) {
  try {
    const reportes = await ReporteDiario.find({})
      .populate("ventaDelDia")
      .exec();

    res.status(200).send({ reportes });
  } catch (error) {
    console.error("Error al obtener informes:", error);
    res.status(500).send({ message: "Error al obtener informes" });
  }
}


module.exports = { obtenerReportes };

