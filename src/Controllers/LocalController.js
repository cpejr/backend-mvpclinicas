const LocalModel = require("../Models/LocalModel");
const ComentarioModel = require("../Models/ComentarioModel");
class LocalController {
  async read(req, res) {
    try {
      const locais = await LocalModel.find();

      const locaisComMedia = await Promise.all(
        locais.map(async (local) => {
          const comentarios = await ComentarioModel.find({
            id_local: local._id,
          });
          let mediaAvaliacoes = 0;
          if (comentarios.length > 0) {
            const total_avaliacao = comentarios.length;
            let somaAvaliacoes = 0;
            comentarios.forEach((comentario) => {
              somaAvaliacoes += parseInt(comentario.avaliacao);
            });
            mediaAvaliacoes = somaAvaliacoes / total_avaliacao;
          }

          const localComMedia = {
            ...local.toObject(),
            mediaAvaliacoes,
          };

          return localComMedia;
        })
      );

      return res.status(200).json(locaisComMedia);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async readById(req, res) {
    const { id_local } = req.params;

    const local = await LocalModel.findById(id_local);

    return res.status(200).json(local);
  }

  async destroy(req, res) {
    const { id_local } = req.params;

    const comentarios = await ComentarioModel.find({ id_local });
    comentarios.forEach(async (comentario) => {
      await ComentarioModel.deleteOne({ _id: comentario._id });
    });
    const localDeletado = await LocalModel.findByIdAndDelete(id_local);

    if (!localDeletado)
      return res.status(404).json({ message: "Local não encontrado" });

    return res.status(200).json(localDeletado);
  }
}

module.exports = new LocalController();
