import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { META_PASWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "konashuk.ivan.i@meta.ua",
    pass: META_PASWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "konan4ukv@gmail.com",
  from: "konashuk.ivan.i@meta.ua",
  subject: "Test email",
  html: "<p>Hello it`s test email</p>",
};

export const sendEmail = async (data) => {
  const email = { ...data, from: "konashuk.ivan.i@meta.ua" };
  await transport.sendMail(email);
  return true;
};

//   .then(() => console.log("Email send secces"))
//   .catch((err) => console.log(err.message));
