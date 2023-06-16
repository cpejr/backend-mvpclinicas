const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);
      const {senha, ...usuarioNovo} = usuario.toObject();
      res.status(200).json(usuarioNovo); 
    } catch (error) {
      res.status(500).json({message: "Erro na criação do usuário", error: error.message});
    }
  }
  async read(req, res) {
    try {
      const usuario = await UsuarioModel.find();
      res.status(200).json(usuario);
      
    } catch (error) {
      res.status(500).json({message: "Erro na obtenção dos usuários", error: error.message});
    }
  }
}

module.exports = new UsuarioController();
