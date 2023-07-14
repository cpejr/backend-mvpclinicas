const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    id_usuario: z.custom(
      mongoose.isValidObjectId,
      "O id do usuário é invalido"
    ),
    comentario: z.object({
      "Qual foi o cargo exercido no local?": z.string(),
      "De quanto era o salário pago?": z.string().optional(),
      "O salário era pago em dia?": z.string().optional(),
      "O Local possuí equipe de apoio adequada?": z.string().optional(),
      "Qual o volume de pacientes?": z.string().optional(),
      "No cargo exercido você era responsável por quais outros cargos?": z
        .string()
        .optional(),
      "Qual a área de abrangência do Local": z.string().optional(),
      "Como era a organização do local (Divisão em blocos e áreas)?": z
        .string()
        .optional(),
      "Quais as condições de recursos para o trabalho?": z.string().optional(),
      "Fornece Alimentação?": z.string().optional(),
      "Fornece Horário e Local de descanso adequado?": z.string().optional(),
      "Algum outro comentário?": z.string().optional(),
    }),
    avaliacao: z.string({ required_error: "A avaliação é obrigatória" }),
  }),
});

module.exports = { create };
