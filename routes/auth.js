const express = require("express");
const Joi = require("joi");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { RegisterUser } = require("../models/register_model");

authRoute.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = await RegisterUser.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(400).send("invalid email or password");
    return;
  }

  const validpassword = bcrypt.compare(req.body.password, user.password);
  if (!validpassword) {
    res.status(400).send("password");
    return;
  }

  const token = user.generateAuthToken();
  res.send(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(30).email(),
    password: Joi.string().required().min(5).max(300),
  });

  return schema.validate(user);
}
module.exports = authRoute;
