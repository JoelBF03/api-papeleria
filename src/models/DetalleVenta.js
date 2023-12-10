const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DetalleVentaSchema = Schema({
  idproducto: { type: Schema.ObjectId, ref: "Article" },
  cantidad: Number,
  venta: { type: Schema.ObjectId, ref: "Venta" },
});

module.exports = mongoose.model("DetalleVenta", DetalleVentaSchema);
