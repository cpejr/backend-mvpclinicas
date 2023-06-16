const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", UsuarioController.read);

module.exports = rotas;