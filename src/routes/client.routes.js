const express = require('express');
const clientController = require('../controllers/client.controller');
const protect = require('../middleware/authenticate');

const api = express.Router();

api.post('/newClient', clientController.registerClient);
api.get('/listClients/:name?',  clientController.listClients);
api.get('/listClient/:id',  clientController.listClient);
api.put('/updateClient/:id',  clientController.updateClient)
api.delete('/deleteClient/:id',  clientController.deleteClient)

module.exports = api;