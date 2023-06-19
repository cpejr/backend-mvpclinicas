const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get('/usuarios', UsuarioController.read);
rotas.put('/usuarios/:id', UsuarioController.update);
rotas.get('/usuarios/:id', UsuarioController.readById);

module.exports = rotas;