import joi from "joi";

export const jogoSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().url().required(),
  stockTotal: joi.string().required(),
  pricePerDay: joi.string(),
});
