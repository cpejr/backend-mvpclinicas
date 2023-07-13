const ComentarioModel = require("../Models/ComentarioModel");
const UsuarioModel = require("../Models/UsuarioModel");

class ComentarioController {
  async readByLocal(req, res) {
    const { id_local } = req.params;

    const comentarios = await ComentarioModel.find({
      id_local: id_local,
    }).populate("id_usuario", "nome");

    let total_avaliacao = 0;
    for (const comentario of comentarios) {
      total_avaliacao += parseInt(comentario.avaliacao, 10);
    }
    const media_avaliacao = total_avaliacao / comentarios.length;

    return res.status(200).json({ comentarios, media_avaliacao });
  }
}

module.exports = new ComentarioController();
