import joi from "joi";

export const categoriaSchema = joi.object({
  nome: joi.string().required(),
});
