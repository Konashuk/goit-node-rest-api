import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Bad Request");
  }
  const { name, email, phone } = req.body;
  const result = await addContact(name, email, phone);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
