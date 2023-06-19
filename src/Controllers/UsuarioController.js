const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async read(req, res) {
    const usuarios = await UsuarioModel.find();

    return res.status(200).json(usuarios);
  }

  async readById(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findById(id);

    return res.status(200).json(usuario);
  }

  async update(req, res){
    try{
        const { id } = req.params;
        const usuarioEncontrado = await UsuarioModel.findById(id);

        if (!usuarioEncontrado) 
            return res.status(404).json({ message: "Usuário não encontrado." });
        
        const usuario = await usuarioEncontrado.set(req.body).save();

        return res.status(200).json(usuario);
    } catch(error){
        res.status(500).json({message: "Deu ruim aqui!", error: error.message});
    }
}
}

module.exports = new UsuarioController();
