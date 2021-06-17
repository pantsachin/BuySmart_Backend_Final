const express = require("express");
const router = express.Router();

const {
  addToWishList,
  removeFromWishList,
} = require("../controllers/wishlist.controller.js");
const { createUser } = require("../controllers/userSignUp.controller.js");

// console.log({ addToWishList });
// console.log({ createUser });

router.route("/addItem").post(addToWishList);
router.route("/removeItem").post(removeFromWishList);
router.route("/signUp").post(createUser);

module.exports = router;
