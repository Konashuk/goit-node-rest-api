import { handelMoongoseError } from "../helpers/handelMoonError.js";
import { Schema, model } from "mongoose";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handelMoongoseError);

export const Contacts = model("contact", contactSchema);