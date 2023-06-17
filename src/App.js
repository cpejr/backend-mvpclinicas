const express = require("express");
const rotas = require("./routes");
const cors = require("cors");

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(rotas);
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

module.exports = app;