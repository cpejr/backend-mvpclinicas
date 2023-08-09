
const bcrypt = require("bcrypt");
const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    try {

            const usuarios = await UsuarioModel.create(req.body);
            
            const { senha, ...novoUsuario} = usuarios.toObject();

            return res.status(200).json({ message: 'Usuário cadastrado com sucesso!', usuarios });

        } catch (error) {
            res.status(500).json({ message: "Erro!!", error: error.message });
        }
    }
    async read(req, res) {
        const usuarios = await UsuarioModel.find();

        return res.status(200).json(usuarios);
    }

  async readById(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findById(id);

    return res.status(200).json(usuario);
  }

  async update(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(usuario);
  }
  async updateSenha(req, res) {
    const { id } = req.params;
    const { senhaAtual, senha} = req.body;
    const usuario = await UsuarioModel.findById(id).select("+senha");

    try {
    
      const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
      
      if (!senhaCorreta) {
        
        return res.status(400).json({ message: "Senha atual incorreta" });
      }
    
      usuario.senha = senha;
      await usuario.save();
     
      return res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "Erro!!", error: error.message });
    }
  }
  
  async destroy(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findByIdAndDelete(id);

    return res.status(200).json(usuario);
  }
}
module.exports = new UsuarioController();
