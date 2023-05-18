const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {

    async create (req, res) {
        const usuarios = await UsuarioModel.create(req.body);

        return res.status(200).json(usuarios);
    }
    
    async read (req, res) {
        const usuarios = await UsuarioModel.find();

        return res.status(200).json(usuarios);
    }

    
}

module.exports = new UsuarioController();