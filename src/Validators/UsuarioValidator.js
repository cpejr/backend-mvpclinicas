const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const updateImagem = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"), //se o id não for válido, ele manda a mensagem.
  }),
});
const getImagem = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"), //se o id não for válido, ele manda a mensagem.
  }),
});

module.exports = {
  updateImagem,
  getImagem,
};
