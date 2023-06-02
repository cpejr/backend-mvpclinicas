const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const UsuarioController = require("./Controllers/UsuarioController");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");

const rotas = Router();

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.post('/login', AuthValidator.login, AuthController.login);

module.exports = rotas;