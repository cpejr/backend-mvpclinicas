const ComentarioModel = require("../Models/ComentarioModel");

class ComentarioController {

  async readByLocal(req, res) {
    const { id_local } = req.params;

    const comentarios = await ComentarioModel.find({ id_local: id_local });

    return res.status(200).json(comentarios);
  }
}

module.exports = new ComentarioController();
