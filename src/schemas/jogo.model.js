import joi from "joi";

export const jogoSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stocktotal: joi.required(),
  pricePerDay: joi.required(),
});
