import joi from "joi";

export const clienteSchema = joi.object({
  name: joi.string().required(),
  phone: joi.required(),
  cpf: joi.required(),
  birthday: joi.required(),
});