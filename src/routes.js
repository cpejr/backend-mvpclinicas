const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");

const rotas = Router();

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.get('/usuarios', UsuarioController.read);
rotas.get('/usuarios/:id', UsuarioController.readById);
rotas.post('/usuarios', UsuarioValidator.create, UsuarioController.create);

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.get('/comentarios/:id_local', ComentarioController.readByLocal);

module.exports = rotas;
