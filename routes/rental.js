const express = require("express");
const rentalRouter = express.Router();
const { Movie } = require("../models/movies_model");
const { Customer } = require("../models/customer_model");
const { Rental, validateRental } = require("../models/rental_model");

rentalRouter.get("/", async (req, res) => {
  const rental = await Rental.find();
  res.send(rental);
});

rentalRouter.post("/", async (req, res) => {
  const result = validateRental(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    res.status(400).send("invalid movie");
    return;
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(400).send("invalid customer");
    return;
  }

  const rental = new Rental({
    customer: customer,
    movie: movie,
    rentalRate: req.body.rentalRate,
  });

  const newRental = await rental.save();
  res.send(newRental);
});

rentalRouter.put("/:id", async (req, res) => {
  const result = validateRental(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    res.status(400).send("invalid movie");
    return;
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(400).send("invalid customer");
    return;
  }

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: customer,
      movie: movie,
      rentalRate: req.body.rentalRate,
    },
    {
      new: true,
    }
  );

  if (!rental) {
    res.status(404).send("not found");
    return;
  }
  res.send(rental);
});

rentalRouter.delete("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);

  if (!rental) {
    res.status(404).send("not found");
    return;
  }
  res.send(rental);
});

module.exports = rentalRouter;
