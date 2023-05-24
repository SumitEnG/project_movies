// const winston = require("winston");

function error(err, req, res, next) {
  //   winston.log({
  //     level: "error",
  //     message: err.message,
  //     stack: err.stack,
  //     metadata: err, // Put what you like as meta
  //   });
  res.status(500).send(err);
}

module.exports = error;
