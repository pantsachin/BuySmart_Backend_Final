const express = require("express");
const router = express.Router();

const { addItemToCart } = require("../controllers/cart.controller.js");

router.route("/addItem").post(addItemToCart);

module.exports = router;
