const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { customerSchema } = require("./customer_model");
const { movieSchema } = require("./movies_model");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  rentalRate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Rental = new mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    rentalRate: Joi.number().required(),
  });

  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
