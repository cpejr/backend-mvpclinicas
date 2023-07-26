const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    nome: {
        type: String,
        required: true,
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
        select: false, 
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
});
UsuarioSchema.pre("save", async function(next){
  const user = this
   
  if(user.isModified("senha")){
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.senha, salt);
    
    user.senha = hash;

const UsuarioModel = mongoose.model('/usuarios', UsuarioSchema);

  }

next()
  registro: {
    type: String,
    required: true,
  },
  formacao: {
    required: true,
    type: String,
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;