const mongoose = require("mongoose");

async function startDB() {
  await mongoose.connect(
    "mongodb+srv://orion:grrDyeLiSoLbkgo1@mvpclinicas.gkxgkaa.mongodb.net/"
  );
  console.log("DB conectado");
}

module.exports = startDB;

//grrDyeLiSoLbkgo1
