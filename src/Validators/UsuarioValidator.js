const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const mongoose = require("mongoose");

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    nome: z.string().optional(),
    telefone: z.string().optional(),
    data_nascimento: z.date().optional(),
    email: z.string().email("O email é inválido").optional(),
    senha: z.string().optional(),
    avatar_url: z.string().optional(),
    crm: z.string().optional(),
    uni_federativa: z.string().optional(),
    admin: z.boolean().optional(),
  }),
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
});

module.exports = {
  destroy,
  update,
};
