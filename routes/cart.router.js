const express = require("express");
const router = express.Router();

const {
  addItemToCart,
  removeItemFromCart,
} = require("../controllers/cart.controller.js");

router.route("/addItem").post(addItemToCart);
router.route("/removeItem").post(removeItemFromCart);

module.exports = router;
