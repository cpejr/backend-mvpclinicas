const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get('/usuarios', UsuarioController.read);
rotas.post('/usuarios', UsuarioController.create);

module.exports = rotas;