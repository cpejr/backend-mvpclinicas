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
}

module.exports = new LocalController();