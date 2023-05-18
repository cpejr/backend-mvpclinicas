const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get('/usuarios', UsuarioController.read);

module.exports = rotas;