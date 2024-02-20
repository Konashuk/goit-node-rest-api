import Joi from "joi";
import { emailRegeps } from "../models/users.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegeps).required(),
  password: Joi.string().min(6).required(),
});

export const validateShema = Joi.object({
  email: Joi.string().pattern(emailRegeps).required(),
});
