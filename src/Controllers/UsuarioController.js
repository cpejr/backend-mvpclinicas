const UsuarioModel = require("../Models/UsuarioModel");
const { deleteFile, uploadFile } = require("../config/S3/awsS3");

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
  
  async updateImagem(req, res) {
    const { id } = req.params;
    if (!id) return

    const usuario = await UsuarioModel.findById(id);
    if(usuario.avatar_url != undefined && usuario.avatar_url != null && usuario.avatar_url != ""){
      const chave = usuario.avatar_url
      await deleteFile(chave)
    }

    const file = req.body
    const response = await uploadFile(file)
    usuario.$attributes.avatar_url = response.key
    await usuario.save()

    return res.status(200).json(usuario);
  }
}

module.exports = new UsuarioController();
