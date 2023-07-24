const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const ComentarioValidator = require("./Validators/ComentarioValidator");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);
rotas.delete("/locais/:id_local", LocalController.destroy);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.post(
  "/comentarios/:id_local",
  ComentarioValidator.create,
  ComentarioController.create
);

module.exports = rotas;
