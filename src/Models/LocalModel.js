const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocalSchema = new Schema({
<<<<<<< HEAD
    nome: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    setor: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    foto_url: {
        type: String,
        required: true,
    },
=======
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  // foto_url: {
  //     type: String,
  //     required: true,
  // },
>>>>>>> d9790c36405ac7507e65e3ed2dc063adbc181403
});

const LocalModel = mongoose.model("locais", LocalSchema);

module.exports = LocalModel;
