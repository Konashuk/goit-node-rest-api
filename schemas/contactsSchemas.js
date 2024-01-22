import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).custom((value, helpers) => {
  // Перевірка, чи є хоча б одне поле у значенні
  if (!(value.name || value.email || value.phone)) {
    return helpers.error("any.required");
  }
  return value;
}, "custom validation");
