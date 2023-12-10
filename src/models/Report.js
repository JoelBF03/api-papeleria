const mongoose = require("mongoose");

const reporteDiarioSchema = new mongoose.Schema({
  ventaDelDia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venta", // Cambiado a "Venta" para que coincida con el modelo
    required: true,
  },
  ganancias: {
    type: Number,
    default: 0,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const ReporteDiario = mongoose.model("ReporteDiario", reporteDiarioSchema);

module.exports = ReporteDiario;
