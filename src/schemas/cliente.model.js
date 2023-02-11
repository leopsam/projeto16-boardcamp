import joi from "joi";

export const clienteSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().required(),
  birthday: joi.date().required(),
});