const dotenv = require("dotenv");
const app = require("./App");
const cors_proxy = require("cors-anywhere");

dotenv.config();

cors_proxy
  .createServer({
    originWhitelist: [],
  })
  .listen(8080, () => {
    console.log("CORS rodando");
  });
