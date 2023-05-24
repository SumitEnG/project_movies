const express = require("express");
const genreRoutes = express.Router();
const auth = require("../middleware/auth");
const { Genre, validateGenres } = require("../models/genre_model");

genreRoutes.get("/", async (req, res) => {
  throw new Error("failed to load");
  const genre = await Genre.find();
  res.send(genre);
});

genreRoutes.post("/", auth, async (req, res) => {
  const result = validateGenres(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = new Genre({
    name: req.body.name,
  });

  const newGenre = await genre.save();
  res.send(newGenre);
});

genreRoutes.put("/:id", async (req, res) => {
  const result = validateGenres(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!genre) {
    res.status(404).send("404 not found");
    return;
  }
  res.send(genre);
});

genreRoutes.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    res.status(404).send("404 not found");
    return;
  }
  res.send(genre);
});

module.exports = genreRoutes;
