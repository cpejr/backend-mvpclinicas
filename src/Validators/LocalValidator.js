const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");
const UsuarioModel = require("../Models/UsuarioModel");

const ConfereAdmin = async (req, res, next) => {
  const { id_usuario } = req.params;

  try {
    const usuario = await UsuarioModel.findOne({ id_usuario }).exec();
    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrado." });
    }

    if (!usuario.admin) {
      return res
        .status(403)
        .json({
          message: "Apenas administradores podem realizar esta operação.",
        });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao verificar a permissão do usuario." });
  }
};

const destroy = validateRequest({
  params: z.object({
    id: z.custom(
      mongoose.isValidObjectId,
      "o id não é válido para esta operação."
    ),
  }),
});

module.exports = { destroy, ConfereAdmin };
