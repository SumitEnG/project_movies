const express = require("express");
const registerRoute = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { stringify } = require("flatted");
const {
  RegisterUser,
  validateRegisterUser,
} = require("../models/register_model");
const auth = require("../middleware/auth");

registerRoute.get("/me", auth, async (req, res) => {
  const user = await RegisterUser.findById(req.user._id).select("-password");
  res.send(user);
});

registerRoute.post("/", async (req, res) => {
  const result = validateRegisterUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let user = await RegisterUser.findOne({
    email: req.body.email,
  });
  if (user) {
    return res.status(400).send("user already registered");
  }

  const registerUser = new RegisterUser(
    _.pick(req.body, ["name", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  registerUser.password = await bcrypt.hash(registerUser.password, salt);

  const newUser = await registerUser.save();
  const token = newUser.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(newUser, ["name", "email"]));
});

module.exports = registerRoute;
