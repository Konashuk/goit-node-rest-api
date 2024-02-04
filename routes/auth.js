import express from "express";
import { cnrtWraper } from "../helpers/cntrWraper.js";
import { login, register } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", cnrtWraper(register));

authRouter.post("/login", cnrtWraper(login));

export default authRouter;
