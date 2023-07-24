const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

rotas.put("/usuariosimagem/:id", UsuarioController.updateImagem);
rotas.get("/usuariosimagem/:id", UsuarioController.pegarImagem);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
