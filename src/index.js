const dotenv = require("dotenv");
const app = require("./App");
const Loaders = require("./Loaders/index");

dotenv.config();
Loaders.start();
const port = process.env.PORT || 7000;
app.listen(port, () => console.log("Servidor Rodando"));
