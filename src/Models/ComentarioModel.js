const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema ({
    id_comentario : String,
    id_usuario : {
        type : Schema.Types.ObjectId,
        ref : 'usuarios'
    },
    id_local : {
        type : Schema.Types.ObjectId,
        ref : 'locais'
    },
    comentario : String,
    avaliacao : String,
})

const ComentarioModel = mongoose.model('/comentarios', ComentarioSchema);

modules.export = ComentarioModel;