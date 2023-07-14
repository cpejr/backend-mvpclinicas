const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatória" }),
    telefone: z.string({ required_error: "O telefone é obrigatória" }),
    setor: z.string({ required_error: "O setor é obrigatória" }),
    empresa: z.string({ required_error: "O empresa é obrigatória" }),
    endereco: z.string({ required_error: "O endereco é obrigatória" }),
    // foto_url: z.string({ required_error: "O foto_url é obrigatória" }),
  }),
});

module.exports = { create };