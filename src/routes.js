const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const ComentarioValidator = require("./Validators/ComentarioValidator");
const LocalValidator = require("./Validators/LocalValidator");
const UsuarioModel = require("./Models/UsuarioModel");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);
rotas.delete("/locais/:id_local", LocalController.destroy, LocalValidator.destroy, LocalValidator.ConfereAdmin);
rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);
rotas.put(
  "/usuarios/:id",
  verificarJwt,
  verificarUsuario,
  UsuarioValidator.update,
  UsuarioController.update
);
rotas.put("/usuarios/alterar_senha/:id", UsuarioValidator.updateSenha, UsuarioController.updateSenha);
rotas.delete(
  "/usuarios/:id",
  UsuarioValidator.destroy,
  UsuarioController.destroy
);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);
rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);
rotas.post("/login", AuthValidator.login, AuthController.login);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.post("/comentarios/:id_local",ComentarioValidator.create, ComentarioController.create);
rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
