const { Router } = require("express");

const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const LocalValidator = require("./Validators/LocalValidator");

const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");

const AuthValidator = require("./Validators/AuthValidator");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const ComentarioValidator = require("./Validators/ComentarioValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificarJwt, UsuarioController.read);
rotas.get("/usuarios/:id", verificarJwt, UsuarioController.readById);

rotas.post("/locais", verificarJwt, LocalValidator.create, LocalController.create);
rotas.get("/locais", verificarJwt, LocalController.read);
rotas.get("/locais/:id_local", verificarJwt, LocalController.readById);

rotas.post("/login", AuthValidator.login, AuthController.login);

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

rotas.get("/comentarios/:id_local", verificarJwt, ComentarioController.readByLocal);
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

module.exports = rotas;
