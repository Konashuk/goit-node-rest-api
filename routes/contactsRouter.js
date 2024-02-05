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
import { authenticate } from "../middelwares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, cnrtWraper(getAllContacts));

contactsRouter.get("/:id", authenticate, isValidId, cnrtWraper(getOneContact));

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  cnrtWraper(deleteContact)
);

contactsRouter.post("/", authenticate, cnrtWraper(createContact));

contactsRouter.put("/:id", authenticate, isValidId, cnrtWraper(updateContact));

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  cnrtWraper(updateStatusContact)
);

export default contactsRouter;
