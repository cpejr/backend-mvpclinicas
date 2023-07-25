const { Router } = require("express");
const LocalController = require("./Controllers/LocalController");
const ComentarioController = require("./Controllers/ComentarioController");
const UsuarioController = require("./Controllers/UsuarioController");
const ComentarioValidator = require("./Validators/ComentarioValidator");
const LocalValidator = require("./Validators/LocalValidator");
const UsuarioModel = require("./Models/UsuarioModel");

const rotas = Router();

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);
rotas.delete("/locais/:id_local", LocalController.destroy, LocalValidator.destroy, LocalValidator.ConfereAdmin);

rotas.get("/usuarios", UsuarioController.read);
rotas.get("/usuarios/:id", UsuarioController.readById);

rotas.get("/locais", LocalController.read);
rotas.get("/locais/:id_local", LocalController.readById);

rotas.get("/comentarios/:id_local", ComentarioController.readByLocal);
rotas.post("/comentarios/:id_local",ComentarioValidator.create, ComentarioController.create);

rotas.get("/:id_usuario/admin", async (req, res) => {
    const { id_usuario } = req.params;
  
    try {
      const usuario = await UsuarioModel.findById(id_usuario);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
  
      const ehAdmin = usuario.admin;
      res.json({ ehAdmin });
    } catch (err) {
      console.error("Erro ao verificar permissão do usuário:", err);
      res.status(500).json({ message: "Erro ao verificar permissão do usuário." });
    }
});

module.exports = rotas;
