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
import { isValidId } from "../middelwares/isValidId.js";
import { authenticate } from "../middelwares/authenticate.js";
import { checkId } from "../middelwares/chekId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, cnrtWraper(getAllContacts));

contactsRouter.get(
  "/:id",
  authenticate,
  checkId,
  isValidId,
  cnrtWraper(getOneContact)
);

contactsRouter.delete(
  "/:id",
  authenticate,
  checkId,
  isValidId,
  cnrtWraper(deleteContact)
);

contactsRouter.post("/", authenticate, cnrtWraper(createContact));

contactsRouter.put(
  "/:id",
  authenticate,
  checkId,
  isValidId,
  cnrtWraper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  cnrtWraper(updateStatusContact)
);

export default contactsRouter;
