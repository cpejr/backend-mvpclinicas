const LocalModel = require("../Models/LocalModel");
const ComentarioModel = require("../Models/ComentarioModel");
class LocalController {
  async read(req, res) {
    const locais = await LocalModel.find();

    return res.status(200).json(locais);
  }

  async readById(req, res) {
    const { id_local } = req.params;

    const local = await LocalModel.findById(id_local);

    return res.status(200).json(local);
  }

  async destroy(req, res) {
    const { id_local } = req.params;

    const comentarios = await ComentarioModel.deleteMany({ id_local });
    const localDeletado = await LocalModel.deleteOne({ _id: id_local });

    if (!localDeletado)
      return res.status(404).json({ message: "Local não encontrado" });

    return res.status(200).json(localDeletado);
  }
}

module.exports = new LocalController();
