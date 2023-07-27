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

const create = validateRequest({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatório" }),
    telefone: z.string({
      required_error: "O número de telefone é obrigatório",
    }),
    data_nascimento: z.string({
      required_error: "A data de nascimento é obrigatória",
    }),
    email: z
      .string({ required_error: "O email é obrigatório" })
      .email("O email é inválido"),
    senha: z.string({ required_error: "A senha é obrigatória" }),
    registro: z.string({ required_error: "O resgistro é obrigatório" }),
    formacao: z.string({
      required_error: "A formação profissional é obrigatória",
    }),
    uni_federativa: z.string({
      required_error: "A unidade federativa é obrigatória",
    }),
  }),
});

module.exports = {
  create,
  updateImagem,
  getImagem,
};
