import joi from "joi";

export const jogoSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.required(),
  pricePerDay: joi.required(),
});
