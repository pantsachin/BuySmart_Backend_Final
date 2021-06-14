const express = require("express");

const router = express.Router();

const {
  createNewUserOnSignUp,
  getUserDataOnLogin,
} = require("../controllers/userData.controller.js");

router.route("/signUp").post(createNewUserOnSignUp);
router.route("/login").post(getUserDataOnLogin);

module.exports = router;
