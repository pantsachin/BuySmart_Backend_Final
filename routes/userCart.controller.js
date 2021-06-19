const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cart.controller.js");

router.route("/addItem").post(addToCart);
router.route("/removeItem").post(removeFromCart);
router.route("/increaseQuantity").post(increaseQuantity);
router.route("/decreaseQuantity").post(decreaseQuantity);

module.exports = router;
