const { hash } = require("bcrypt");
const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {

    async create(req, res) {
        try {

            const usuarios = await UsuarioModel.create(req.body);
            
            const { senha, ...novoUsuario} = usuario.toObject();

            return res.status(200).json({ message: 'Usuário cadastrado com sucesso!', usuarios });

        } catch (error) {
            res.status(500).json({ message: "Erro!!", error: error.message });
        }
    }
    async read(req, res) {
        const usuarios = await UsuarioModel.find();

        return res.status(200).json(usuarios);
    }
}

module.exports = new UsuarioController();