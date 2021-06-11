const express = require("express");

const app = express();

const fakeProducts = require("./data/productDataBase");

app.get("/", (req, res) => {
  res.send("We are on home!");
});

app.get("/post", (req, res) => {
  res.send({ soorma: "soorma" });
});

app.listen(3000);
