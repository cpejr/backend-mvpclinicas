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
rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);
rotas.delete(
  "/locais/:id_local",
  LocalController.destroy,
  LocalValidator.destroy,
  LocalValidator.ConfereAdmin
);
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
rotas.post("/locais", verificarJwt, verificarUsuario,LocalController.create);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.post("/login", AuthValidator.login, AuthController.login);

rotas.post("/login", AuthValidator.login, AuthController.login);
rotas.put(
  "/usuariosimagem/:id",
  UsuarioValidator.updateImagem,
  UsuarioController.updateImagem
);
rotas.get(
  "/usuariosimagem/:id",
  UsuarioValidator.pegarImagem,
  UsuarioController.pegarImagem
);

rotas.put(
  "/usuariosimagem/:id",
  verificarUsuario,
  verificarJwt,
  UsuarioValidator.updateImagem,
  UsuarioController.updateImagem
);
rotas.get(
  "/usuariosimagem/:id",
  verificarJwt,
  //UsuarioValidator.pegarImagem,
  UsuarioController.pegarImagem
);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.get(
  "/comentarios/usuario/:id_usuario",
  verificarJwt,
  ComentarioController.readByUsuario
);
rotas.post(
  "/comentarios/:id_local",
  verificarJwt,
  ComentarioValidator.create,
  ComentarioController.create
);
rotas.delete(
  "/comentarios/:id_comentario",
  verificarJwt,
  ComentarioValidator.destroy,
  ComentarioController.destroy
);
rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
