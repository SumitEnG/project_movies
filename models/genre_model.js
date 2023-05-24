const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = new mongoose.model("Genre", genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validateGenres = validateGenres;
module.exports.genreSchema = genreSchema;
