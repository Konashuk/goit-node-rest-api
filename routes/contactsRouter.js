import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { cnrtWraper } from "../helpers/cntrWraper.js";
import { isValidId } from "../schemas/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", cnrtWraper(getAllContacts));

contactsRouter.get("/:id", isValidId, cnrtWraper(getOneContact));

contactsRouter.delete("/:id", isValidId, cnrtWraper(deleteContact));

contactsRouter.post("/", cnrtWraper(createContact));

contactsRouter.put("/:id", isValidId, cnrtWraper(updateContact));

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  cnrtWraper(updateStatusContact)
);

export default contactsRouter;
