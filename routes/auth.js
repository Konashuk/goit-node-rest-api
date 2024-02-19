import express from "express";
import { cnrtWraper } from "../helpers/cntrWraper.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
} from "../controllers/auth.js";
import { authenticate } from "../middelwares/authenticate.js";
import { upload } from "../middelwares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", cnrtWraper(register));

authRouter.post("/login", cnrtWraper(login));

authRouter.get("/current", authenticate, cnrtWraper(getCurrent));

authRouter.post("/logout", authenticate, cnrtWraper(logout));

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  cnrtWraper(updateAvatar)
);

export default authRouter;
