const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  data_nascimento: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  registro: {
    type: String,
    required: true,
  },

  formacao: {
    type: String,
    required: true,
  },
  
  uni_federativa: {
    type: String,
    required: true,
  },
    admin: {
    type: Boolean,
    required: true,
    default: false
  },
});

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema);

module.exports = UsuarioModel;
