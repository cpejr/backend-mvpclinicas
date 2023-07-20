const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);
rotas.put(
  "/usuarios/:id",
 // verificarJwt,
 // verificarUsuario,
  UsuarioValidator.update,
  UsuarioController.update
);
rotas.put("/usuarios/alterar_senha/:id", UsuarioValidator.updateSenha, UsuarioController.updateSenha);
rotas.delete(
  "/usuarios/:id",
  UsuarioValidator.destroy,
  UsuarioController.destroy
);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.post("/login", AuthValidator.login, AuthController.login);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
