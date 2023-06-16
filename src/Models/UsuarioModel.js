const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    nome: {
        type: String,
        required: true,
      },
      nome_mae: {
        type: String,
        required: false,
      },
      nome_pai: {
        type: String,
        required: false,
      },
      telefone: {
        type: String,
        required: true,
        unique: true, 
      },
      data_nascimento: {
        type: Date,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique : true,
      },
      senha: {
        type: String,
        required: true,
      },
      avatar_url: {
        type: String,
        required: false,
      },
      crm: {
        type: String,
        required: true,
        unique: true,
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
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;