const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const verificarJwt = require ("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");

const rotas = Router();

rotas.post('/usuarios', UsuarioValidator.create, UsuarioController.create);
rotas.get('/usuarios',verificarJwt, UsuarioController.read);

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.post('/login', AuthValidator.login, AuthController.login);

rotas.get('/usuarios', UsuarioController.read);
rotas.get('/usuarios/:id', UsuarioController.readById);

rotas.get('/comentarios/:id_local', ComentarioController.readByLocal);

module.exports = rotas;
