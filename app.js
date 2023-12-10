const express = require('express');
const cors = require('cors');
const db = require('./src/config/config');
const bodyParser = require('body-parser');

//* Inicialización de express
const app = express();

// TODO: RUTAS
const user_routes = require('./src/routes/user.routes.js');
const auth_routes = require('./src/routes/auth.routes.js');
const client_routes = require('./src/routes/client.routes.js');
const producto_routes = require('./src/routes/producto.routes.js');
const venta_routes = require('./src/routes/venta.routes.js');
const report_routes = require('./src/routes/report.routes.js');

// TODO: CONEXION A BASE DE DATOS
db();

// TODO: HABILITACIÓN DE LAS SOLICITUDES CRUZADAS
app.use(cors());

//* CONFIGURACION ADICIONAL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// TODO: RUTAS PRINCIPALES
app.use('/api/PpApi/user', user_routes);
app.use('/api/PpApi/auth', auth_routes);
app.use('/api/PpApi/client', client_routes);
app.use("/api/PpApi/producto", producto_routes);
app.use("/api/PpApi/venta", venta_routes);
app.use("/api/PpApi/report", report_routes);

module.exports = app;