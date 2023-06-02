const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    id_usuario : String,
    nome : String,
    telefone : String,
    data_nascimento : String,
    email : String,
    senha : {
      type: String,
      select: false,
    },
    avatar_url : String,
    admin : Boolean,
})
/*UsuarioSchema.pre("save", async function(next){
  const user = this
   
  if(user.isModified("senha")){
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.senha, salt);
    
    user.senha = hash;

    console.log(salt , hash);

  }

next()
});*/
const UsuarioModel = mongoose.model('/usuarios', UsuarioSchema);

module.exports = UsuarioModel;