const express = require("express");
const protect = require("../middleware/authenticate");
const api = express.Router();

const reporteController = require("../controllers/report.controller");

api.get("/get-report", reporteController.obtenerReportes);

module.exports = api;