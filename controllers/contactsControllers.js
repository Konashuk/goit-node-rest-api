import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

import { Contacts } from "../models/contacts.js";

export const getAllContacts = async (req, res) => {
  const result = await Contacts.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { name, email, phone } = req.body;
  const result = await Contacts.create({ name, email, phone });
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
