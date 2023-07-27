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

    async create(req, res) {
        try {
            const novoLocal = await LocalModel.create(req.body);
            return res.status(200).json({ message: 'Novo local cadastrado com sucesso!', novoLocal });
        } catch (error) {
            res.status(500).json({ message: "Erro!!", error: error.message });
        }
    }
}

module.exports = new LocalController();
