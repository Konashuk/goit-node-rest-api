import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/contacts.js";

export const checkId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contacts.findById(id);
    if (!contact) {
      throw HttpError(404, "Contact not found");
    }
    if (contact.owner.toString() !== owner.toString()) {
      throw HttpError(403, "Forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
