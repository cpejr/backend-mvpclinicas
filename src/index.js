const app = require("./App");
const Loaders = require("./Loaders/index");
const cors_proxy = require('cors-anywhere');

Loaders.start();

cors_proxy.createServer({
  originWhitelist: [], 
}).listen(8080, () => {
  console.log("CORS rodando");
});

app.listen(8000, () => console.log("Servidor Rodando"));