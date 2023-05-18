const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {

    async read (req, res) {
        const usuarios = await UsuarioModel.find();

        return res.status(200).json(usuarios);
    }
}

module.exports = new UsuarioController();