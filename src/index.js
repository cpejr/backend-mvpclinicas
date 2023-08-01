const dotenv = require("dotenv")
const app = require("./App");
const Loaders = require("./Loaders/index");

dotenv.config();
Loaders.start();

app.listen(8000, () => console.log("Servidor Rodando"));