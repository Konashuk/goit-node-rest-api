import { Schema, model } from "mongoose";
import { handelMoongoseError } from "../helpers/handelMoonError.js";
import Joi from "joi";

const emailRegeps = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegeps,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handelMoongoseError);

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegeps).required(),
  password: Joi.string().min(6).required(),
});

export const User = model("user", userSchema);