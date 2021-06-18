const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller.js");

router.route("/addItem").post(addToCart);
router.route("/removeItem").post(removeFromCart);

module.exports = router;
