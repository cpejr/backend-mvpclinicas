const { Router } = require("express");

const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");

const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");

const AuthValidator = require("./Validators/AuthValidator");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const ComentarioValidator = require("./Validators/ComentarioValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificarJwt, UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.post("/login", AuthValidator.login, AuthController.login);
rotas.put(
  "/usuariosimagem/:id",
  //UsuarioValidator.updateImagem,
  UsuarioController.updateImagem
);
rotas.get(
  "/usuariosimagem/:id",
  //UsuarioValidator.pegarImagem,
  UsuarioController.pegarImagem
);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.get(
  "/comentarios/usuario/:id_usuario",
  ComentarioController.readByUsuario
);
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

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
