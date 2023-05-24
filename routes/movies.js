const express = require("express");
const movieRoute = express.Router();
const { Movie, validateMovies } = require("../models/movies_model");
const { Genre } = require("../models/genre_model");

movieRoute.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

movieRoute.post("/", async (req, res) => {
  const result = validateMovies(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findById(req.body.genreId);

  if (!genre) {
    res.status(400).send("invalid genre");
    return;
  }

  const movie = new Movie({
    title: req.body.title,
    genre: genre,
    numberInStocks: req.body.numberInStocks,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  const newMovie = await movie.save();
  res.send(newMovie);
});

movieRoute.put("/:id", async (req, res) => {
  const result = validateMovies(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findById(req.body.genreId);

  if (!genre) {
    res.status(400).send("invalid genre");
    return;
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: genre,
      numberInStocks: req.body.numberInStocks,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) {
    res.status(404).send("not found");
    return;
  }
  res.send(movie);
});

movieRoute.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    res.status(404).send("not found");
    return;
  }
  res.send(movie);
});

module.exports = movieRoute;
