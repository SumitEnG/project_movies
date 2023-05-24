const mongoose = require("mongoose");
const { genreSchema } = require("./genre_model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStocks: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

const Movie = new mongoose.model("Movie", movieSchema);

function validateMovies(movie) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStocks: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validateMovies = validateMovies;
module.exports.movieSchema = movieSchema;
