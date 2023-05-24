const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {

    async create (req, res) {
        try {
            const usuarios = await UsuarioModel.create(req.body);

            return res.status(200).json(usuarios);

        } catch (error) {
            res.status(500).json({message: "Erro!!", error:error.message});
        }
    }
    
}

module.exports = new UsuarioController();