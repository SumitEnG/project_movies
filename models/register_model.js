const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 300,
  },
  isAdmin: Boolean,
});

registerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const RegisterUser = new mongoose.model("RegisterUser", registerSchema);

function validateRegisterUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(30),
    email: Joi.string().required().min(5).max(30).email(),
    password: Joi.string().required().min(5).max(300),
  });

  return schema.validate(user);
}

module.exports.RegisterUser = RegisterUser;
module.exports.validateRegisterUser = validateRegisterUser;
