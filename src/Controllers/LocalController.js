const LocalModel = require("../Models/LocalModel");

class LocalController {

    async read(req, res) {
        const locais = await LocalModel.find();

        return res.status(200).json(locais);
    }

    async readById(req, res) {
        const { id_local } = req.params;

        const local = await LocalModel.findById(id_local);

        return res.status(200).json(local);
    }

    async create(req, res) {
        try {
            const novoLocal = await LocalModel.create(req.body);
            return res.status(200).json({ message: 'Novo local cadastrado com sucesso!', novoLocal });
        } catch (error) {
            res.status(500).json({ message: "Erro!!", error: error.message });
        }
    }
}

module.exports = new LocalController();