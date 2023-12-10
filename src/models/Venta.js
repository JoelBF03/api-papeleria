const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VentaSchema = Schema({
  idcliente: { type: Schema.ObjectId, ref: "Client" }, //PERSONA QUE ESTA COMPRANDO
  iduser: { type: Schema.ObjectId, ref: "User" }, //EMPLEADO QUE REALIZA LA VENTA
  fecha: { type: Date, default: Date.now }, //FECHA DE LA VENTA
  montoTotal: { type: Number, required: true },
});

module.exports = mongoose.model("Venta", VentaSchema);
