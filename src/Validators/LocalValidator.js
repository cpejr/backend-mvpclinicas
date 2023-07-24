const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const destroy = validateRequest({
    params: z.object({
        id: z.costum(mongoose.isValidObjectId, "o id não é válido para esta operação."),
    }),
});

module.exports = { destroy };