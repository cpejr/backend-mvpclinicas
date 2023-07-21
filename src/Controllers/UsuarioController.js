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
    if (!id) return; // Tratar esse caso com validator

    const usuario = await UsuarioModel.findOne({ email: "lucas@cpe.com" }); // Interessante utilizar o .exec() depois de qualquer find
    if (usuario.avatar_url) {
      const chave = usuario.avatar_url;
      await deleteFile(chave); // Pode ser colocado em um middleware
      //   //PROBLEMA: para a exlusão de arquivos o acesso está proibido. Checar permissões do usuário
    }

    const file = req.body.file;
    const { key } = await uploadFile({
      file,
      ACL: "public-read	",
    }); // Consultor PO sobre acesso dos arquivos
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`; // Pode testar algo assim caso o acesso do arquivo seja público
    usuario.set({ avatar_url: key }); // O upload file não retorna uma url
    await usuario.save();

    return res.status(200).json(usuario);
  }
}

module.exports = new UsuarioController();
