const express = require("express");
const productoController = require("../controllers/articles.controller");
const protect = require("../middleware/authenticate");

const api = express.Router();

api.post("/registrar",  productoController.registrar);
api.get("/listado/:name?", productoController.listarProducto);
api.put("/editar/:id",  productoController.editarProducto);
api.get("/ver/:id",  productoController.obtenerProducto);
api.delete("/eliminar/:id",  productoController.eliminarProducto);
api.put("/actualizar/stock/:id",  productoController.act_stock);

module.exports = api;
