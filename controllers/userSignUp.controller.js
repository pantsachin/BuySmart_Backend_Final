const { Product } = require("../models/product.model.js");
const { User } = require("../models/user.model.js");

const createUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const NewUser = new User({ userName: userName, password: password });
    const saveNewUser = await NewUser.save();

    res
      .status(200)
      .json({ success: true, message: "Sign Up successfull", saveNewUser });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "couldn't create a new user " });
  }
};

module.exports = { createUser };
