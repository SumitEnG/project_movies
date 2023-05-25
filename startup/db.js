const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
  mongoose
    .connect(process.env.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db.."))
    .catch((err) => console.log(err.message));
};
