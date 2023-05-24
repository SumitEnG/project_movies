const registerRoute = require("../routes/register");
const rentalRouter = require("../routes/rental");
const customerRoutes = require("../routes/customer");
const movieRoute = require("../routes/movies");
const genreRoutes = require("../routes/genres");
const authRoute = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/app/movies/genres", genreRoutes);
  app.use("/app/movies", movieRoute);
  app.use("/app/customers", customerRoutes);
  app.use("/app/rentals", rentalRouter);
  app.use("/app/register", registerRoute);
  app.use("/app/login", authRoute);
  app.use(error);
};
