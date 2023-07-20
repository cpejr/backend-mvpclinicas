const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const mongoose = require("mongoose");

const create = validateRequest({
    body: z.object({
        nome : z.string({ required_error: "O nome é obrigatório" }),
        telefone : z.string({ required_error: "O número de telefone é obrigatório" }),
        data_nascimento : z.string({ required_error: "A data de nascimento é obrigatória" }),
        email : z.string({ required_error: "O email é obrigatório" }).email("O email é inválido"),
        senha : z.string({ required_error: "A senha é obrigatória" }),
        crm : z.string({ required_error: "O CRM é obrigatório" }),
        uni_federativa : z.string({ required_error: "A unidade federativa é obrigatória" }),
        
    }),

});

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
const updateSenha = validateRequest({
  body: z.object({
    senhaAtual: z.string({ required_error: "A senha atual é obrigatória" }),
    novaSenha: z.string({ required_error: "A nova senha é obrigatória" }),
    confirmacaoSenha: z.string({ required_error: "A confirmação senha é obrigatória" }),
  }),
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
})
module.exports = {
  destroy,
  update,
  create,
  updateSenha
};
