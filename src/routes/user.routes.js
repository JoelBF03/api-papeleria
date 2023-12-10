const express = require('express');
const userController = require('../controllers/user.controller');
const protect = require('../middleware/authenticate');

const api = express.Router();

api.post('/newUser', userController.registerUser);
api.get('/listUsers/:name?', userController.listUsers);
api.get('/listUser/:id', userController.listUser);
api.put('/updateUser/:id', userController.updateUser)
api.delete('/deleteUser/:id', userController.deleteUser)

module.exports = api;