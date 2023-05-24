const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 12,
    required: true,
  },
  isAdmin: Boolean,
});

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().required().min(4).max(20),
    phone: Joi.string().required().min(10).max(12),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validateCustomer = validateCustomer;
