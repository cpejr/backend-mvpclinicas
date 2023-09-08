const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: 2097152 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

module.exports = app;
