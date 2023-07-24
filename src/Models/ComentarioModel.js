const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  id_local: {
    type: Schema.Types.ObjectId,
    ref: "locais",
    required: true,
  },
  comentario: {
    type: Object,
    required: true,
  },
  avaliacao: {
    type: String,
    required: true,
  }
});

const ComentarioModel = mongoose.model("comentarios", ComentarioSchema);

module.exports = ComentarioModel;
