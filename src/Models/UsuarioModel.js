const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    unique: true,
  },
  telefone: {
    type: String,
    unique: true,
  }, 
  crm: {
    type: String,
    unique: true,
  },
  avatar_url: {
    type: String,
  },
  data_nascimento: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  uni_federativa: {
    type: String
  },
  senha: {
    type: String,
    select: false
  }
});

UsuarioSchema.pre("save", async function(next){
  if (this.isModified("senha")) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.senha, salt);
    this.senha = hash;
  }
  next();
});

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema);

module.exports = UsuarioModel;
