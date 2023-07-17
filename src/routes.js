const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const verificarJwt = require ("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");

const rotas = Router();

rotas.post('/usuarios', UsuarioValidator.create, UsuarioController.create);
rotas.get('/usuarios',verificarJwt, UsuarioController.read);

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.post('/login', AuthValidator.login, AuthController.login);

module.exports = rotas;

