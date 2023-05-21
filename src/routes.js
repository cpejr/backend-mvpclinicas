const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");

const rotas = Router();

rotas.get('/locais', LocalController.read);
rotas.get('/locais/:id_local', LocalController.readById);

rotas.get('/comentarios/:id_local', ComentarioController.readByLocal);

module.exports = rotas;