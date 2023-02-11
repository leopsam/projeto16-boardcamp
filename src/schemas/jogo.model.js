import joi from "joi";

export const jogoSchema = joi.object({
  name: joi.string(),
  image: joi.string(),
  stockTotal: joi.string(),
  pricePerDay: joi.string(),
});
