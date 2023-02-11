import joi from "joi";

export const clienteSchema = joi.object({
  name: joi.string(),
  phone: joi.required(),
  cpf: joi.string().required(),
  birthday: joi.required(),
});