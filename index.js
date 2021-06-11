const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("We are on home!");
});

app.get("/post", (req, res) => {
  res.send({ soorma: "soorma" });
});

app.listen(3000);
