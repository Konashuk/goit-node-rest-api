import { User } from "../models/users.js";
import { handelMoongoseError } from "../helpers/handelMoonError.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authSchema, validateShema } from "../schemas/authSchems.js";
import gravatar, { url } from "gravatar";
import path, { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/sendEmail.js";
import { verify } from "crypto";
dotenv.config();

const { SECRET_KEY, BASE_URL } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

export const register = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    throw handelMoongoseError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Click link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({ message: "Verification successful" });
};

export const resendVerifyEmail = async (req, res) => {
  const { error } = validateShema.validate(req.body);
  if (error) {
    throw handelMoongoseError(400, error.message);
  }

  const { email } = req.body;
  console.log(email);
  const user = await User.findOne(email);
  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${user.verificationToken}">Click link to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json("Verification email sent");
};

export const login = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    throw handelMoongoseError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email: email,
    subscription: subscription,
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Sorry, you need to upload avatar");
  }
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUploadPath = path.join(avatarsDir, fileName);

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUploadPath);

    const avatarURL = path.join("avatars", fileName);

    await User.findByIdAndUpdate(req.user, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    console.error("Помилка при оновленні аватарки:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
