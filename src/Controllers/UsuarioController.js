
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const UsuarioModel = require("../Models/UsuarioModel");
const {
  deleteFile,
  uploadFile,
  apagarArquivo,
  enviarArquivo,
  pegarAquivo,
} = require("../config/S3/awsS3");

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

    return res.status(200).json(usuarios);
  }

  async readById(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findById(id);

    return res.status(200).json(usuario);
  }

  async updateImagem(req, res) {
    const { id } = req.params;
    if (!id) return;

    const usuario = await UsuarioModel.findOne({ _id: id });
    if (usuario.avatar_url) {
      const chave = usuario.avatar_url;
      await apagarArquivo(chave);
    }

    const file = req.body.file;
    const { key } = await enviarArquivo({
      file,
      ACL: "public-read	",
    });
    //const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    usuario.set({ avatar_url: key }); // O upload file não retorna uma url
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async pegarImagem(req, res) {
    const { id } = req.params;

    const usuario = await UsuarioModel.findOne({ _id: id });

    let resultado;
    
    if (!usuario.avatar_url) resultado = await pegarAquivo("defaultPfp.json");
    else {
      try {
        resultado = await pegarAquivo(usuario.avatar_url);
      } catch (error) {
        resultado = await pegarAquivo("defaultPfp.json");
      }
    }
    const imagem = JSON.parse(resultado);
    return res.status(200).json(imagem);
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
    const { senhaAtual, senha } = req.body;
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
