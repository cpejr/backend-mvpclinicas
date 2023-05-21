const LocalModel = require("../Models/LocalModel");

class LocalController {

    async read(req, res) {
        const locais = await LocalModel.find();
        
        return res.status(200).json(locais);
    }
}

module.exports = new LocalController();
