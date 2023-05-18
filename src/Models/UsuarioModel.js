const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  id_usuario: String,
  nome: String,
  telefone: String,
  data_nascimento: String,
  email: String,
  senha: String,
  avatar_url: String,
  crm: String,
  uni_federativa: String,
  admin: Boolean,
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;
