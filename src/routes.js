const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const ComentarioValidator = require("./Validators/ComentarioValidator");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.get("/comentarios/usuario/:id_usuario", ComentarioController.readByUsuario);

rotas.post(
  "/comentarios/:id_local",
  ComentarioValidator.create,
  ComentarioController.create
);

rotas.delete(
  "/comentarios/:id_comentario",
  ComentarioValidator.destroy, 
  ComentarioController.destroy
);



module.exports = rotas;
