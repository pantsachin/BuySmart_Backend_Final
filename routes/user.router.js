const express = require("express");
const router = express.Router();

const { addToWishList } = require("../controllers/wishlist.controller.js");
const { createUser } = require("../controllers/userSignUp.controller.js");

// console.log({ addToWishList });
// console.log({ createUser });

router.route("/addItem").post(addToWishList);
router.route("/signUp").post(createUser);

module.exports = router;
