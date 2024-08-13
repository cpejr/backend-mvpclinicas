const LocalModel = require("../Models/LocalModel");
const ComentarioModel = require("../Models/ComentarioModel");

async function getPlaceImage(placeName, placeAddress) {
  const GOOGLE_API_KEY = "AIzaSyBUwXbN66GC9i-ZGfQmEY8n_QXGytWBe6I";
  const fetch = (await import("node-fetch")).default;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    placeName
  )}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      const photoReference = place.photos ? place.photos[0].photo_reference : null;

      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
      return photoUrl;
    } else {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        placeAddress
      )}&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        const photoReference = place.photos ? place.photos[0].photo_reference : null;

        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
        return photoUrl;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching place image:", error);
    return null;
  }
}

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

          const image = await getPlaceImage(local.nome, local.endereco);

          const localComMedia = {
            ...local.toObject(),
            mediaAvaliacoes,
            image,
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
    const imagem = await getPlaceImage(local.nome);

    return res.status(200).json({ ...local, imagem });
  }

  async create(req, res) {
    try {
      console.log(req.body);
      const novoLocal = await LocalModel.create(req.body);
      return res.status(200).json({ message: "Novo local cadastrado com sucesso!", novoLocal });
    } catch (error) {
      res.status(500).json({ message: "Erro!!", error: error.message });
    }
  }

  async destroy(req, res) {
    const { id_local } = req.params;

    const comentarios = await ComentarioModel.find({ id_local });
    comentarios.forEach(async (comentario) => {
      await ComentarioModel.deleteOne({ _id: comentario._id });
    });
    const localDeletado = await LocalModel.findByIdAndDelete(id_local);

    if (!localDeletado) return res.status(404).json({ message: "Local não encontrado" });

    return res.status(200).json(localDeletado);
  }
}

module.exports = new LocalController();
