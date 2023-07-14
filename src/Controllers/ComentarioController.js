const ComentarioModel = require("../Models/ComentarioModel");
const LocalModel = require("../Models/LocalModel");
const mongoose = require('mongoose');

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
  async create(req,res) {
    const { id_local } = req.params;
    const data = req.body;

    console.log(id_local)
    const local = await LocalModel.findById(new mongoose.Types.ObjectId(id_local));
    console.log(local)
    if (!local) return res.status(400).json({message: "O id do local não pode ser encontrado!"})

    const comentario = await ComentarioModel.create({
      id_usuario: data.id_usuario,
      id_local: id_local,
      avaliacao: data.avaliacao,
      comentario: data.comentario
    })

    if (!comentario) return res.status(500).json({message: "Problema no servidor!"})

    
    return res.status(201).json({comentario});
  }
}

module.exports = new ComentarioController();
