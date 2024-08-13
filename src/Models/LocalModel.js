const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocalSchema = new Schema({
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
    required: false,
  },
  tipo: {
    type: String,
    required: false,
  },
  hospitalProprio: {
    type: String,
    required: false,
  },
});

const LocalModel = mongoose.model("locais", LocalSchema);

module.exports = LocalModel;
