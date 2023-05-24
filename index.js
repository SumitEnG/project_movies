require("express-async-errors");
const express = require("express");
const app = express();

app.use(express.json());
// require("./startup/logging");
require("./startup/route")(app);
// require("./startup/config")();
require("./startup/db")();

app.get("/", (req, res) => {
  res.send("<h1>working fine</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
