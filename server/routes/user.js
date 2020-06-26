import express from "express";
const { Router } = express;
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/keys.js";
import User from "../models/user.js";
import validator from "../validation/validator.js";
import { userValidator } from "../validation/user.js";
import loginValidator from "../validation/login.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const usr = req.body;
  const { email } = usr;
  const { isValid, errors } = validator(usr, userValidator);

  if (!isValid) return res.status(400).json(errors);

  const foundExistingUser = await User.findOne({ email });
  if (foundExistingUser) return res.status(400).json({ message: "User with that email already exists" });

  try {
    const user = new User(usr);
    await user.save();
    res.json({ message: "New user saved" });
  } catch (err) {
    res.status(400).json({ message: "Problems saving new user" });
  }
});

userRouter.post("/login", async (req, res) => {
  const login = req.body;
  const { isValid, errors } = validator(login, loginValidator);
  if (!isValid) return res.status(400).json(errors);
  try {
    const { email, password } = req.body;
    const user = await User.findByEmailAndPassword(email, password);
    const { id, type } = user;
    const token = "Bearer " + jwt.sign({ id, email, type }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: `User signed`, token });
  } catch (error) {
    res.status(401).json(error);
  }
});

export { userRouter };
