const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./middlewares/errorHandler.js");
const { routeNotFound } = require("./middlewares/routeNotFound.js");
const { initializeDBConnection } = require("./database/database.connect.js");
// const { populateProductsCollection } = require("./utils/utils.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

initializeDBConnection();

app.get("/", (req, res) => {
  res.send("We are on home!");
});

app.get("/post", (req, res) => {
  res.send({ soorma: "soorma" });
});

// populateProductsCollection();

app.use(errorHandler);
app.use(routeNotFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started :white_check_mark:");
});
