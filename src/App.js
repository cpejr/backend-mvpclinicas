const express = require("express");
const rotas = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(rotas);
app.use("*", (req,res) => {
    res.status(404).json({message: `Rota '${req.baseUrl}' não encontrada`});
});
app.use(cors());


module.exports = app;