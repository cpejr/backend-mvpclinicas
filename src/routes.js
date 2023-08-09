const { Router } = require("express");

const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");

const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const LocalValidator = require("./Validators/LocalValidator");
const UsuarioModel = require("./Models/UsuarioModel");

const AuthValidator = require("./Validators/AuthValidator");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const ComentarioValidator = require("./Validators/ComentarioValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificarJwt, UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);
rotas.delete("/locais/:id_local", LocalController.destroy, LocalValidator.destroy, LocalValidator.ConfereAdmin);
rotas.put(
  "/usuarios/:id",
  verificarJwt,
  verificarUsuario,
  UsuarioValidator.update,
  UsuarioController.update
);
rotas.put(
  "/usuarios/alterar_senha/:id",
  UsuarioValidator.updateSenha,
  UsuarioController.updateSenha
);
rotas.delete("/usuarios/:id", UsuarioController.destroy);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);
rotas.post("/login", AuthValidator.login, AuthController.login);

rotas.post("/login", AuthValidator.login, AuthController.login);

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
