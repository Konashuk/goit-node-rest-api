import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { cnrtWraper } from "../helpers/cntrWraper.js";

const contactsRouter = express.Router();

contactsRouter.get("/", cnrtWraper(getAllContacts));

contactsRouter.get("/:id", cnrtWraper(getOneContact));

contactsRouter.delete("/:id", cnrtWraper(deleteContact));

contactsRouter.post("/", cnrtWraper(createContact));

contactsRouter.put("/:id", cnrtWraper(updateContact));

export default contactsRouter;
