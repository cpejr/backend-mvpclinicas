const multer = require("multer");
const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

const upload = multer({ storage: multer.memoryStorage() }); // Checar o multerS3 para facilitar o processo e comunicar a DEV

rotas.put(
  "/usuariosimagem/:id",
  upload.single("imagem"), // O arquivo deverá ser enviado com esse nome na requisição. Não no body e sim em um formData
  UsuarioController.updateImagem
);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);

module.exports = rotas;
