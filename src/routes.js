const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.get('/usuarios', UsuarioController.read);
rotas.get('/usuarios/:id', UsuarioController.readById);

module.exports = rotas;
