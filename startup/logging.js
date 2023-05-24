// const winston = require("winston");
// require("winston-mongodb");

// module.exports = function () {
//   winston.loggers.add({
//     transports: [
//       new winston.transports.File({
//         filename: "uncaughtExceptions.log",
//         handleExceptions: true,
//       }),
//       new winston.transports.File({ filename: "logfile.log" }),
//     ],
//   });

//   process.on("rejectionHandled", (ex) => {
//     throw ex;
//   });

//   winston.add(
//     new winston.transports.MongoDB({ db: "mongodb://127.0.0.1:27017/movies" })
//   );
// };
