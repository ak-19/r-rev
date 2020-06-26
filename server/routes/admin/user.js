import express from "express";
const { Router } = express;
import passport from "passport";
import User from "../../models/user.js";
const userAdminRouter = Router();
import { toAdminTypeUsersArray } from "../../transformation/toAdminTypeUsersArray.js";
import validator from "../../validation/validator.js";
import { userAdminValidator } from "../../validation/userAdmin.js";
import { toAdminUserUpdateObject } from "../../transformation/toAdminUserUpdateObject.js";
userAdminRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type } = req.user;

  if (type !== "admin") {
    return res.status(401).json({ message: "Only admininistrative account can get this list" });
  }

  try {
    const users = await User.find({});
    res.send(toAdminTypeUsersArray(users));
  } catch (error) {
    res.status(400).json({ message: "Failed to get users" });
  }
});

userAdminRouter.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type: role } = req.user;
  if (role !== "admin") return res.status(401).json({ message: "Only admininistrative account can get this list" });

  const { id } = req.params;
  const userToUpdate = req.body;
  const { email, password, type } = userToUpdate;

  const { isValid, errors } = validator(userToUpdate, userAdminValidator);
  if (!isValid) res.status(400).json(errors);
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Trying to update non existin user" });

    await User.updateOne({ _id: id }, toAdminUserUpdateObject({ email, password, type }));
    res.json({ message: "User saved" });
  } catch (error) {
    res.status(400).json({ message: "Problems saving user" });
  }
});

userAdminRouter.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { type: role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({ message: "Only admininistrative account can get this list" });
  }
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(400).json({ message: "Problems deleting user" });
  }
});

export { userAdminRouter };
