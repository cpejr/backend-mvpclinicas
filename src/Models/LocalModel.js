const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const LocalSchema = new Schema ({
    id_local : String,
    nome : String,
    telefone : String,
    setor : String,
    empresa : String,
    endereco : String,
    foto_url : String,
})

const LocalModel = mongoose.model('/locais', LocalSchema);

modules.export = LocalModel;