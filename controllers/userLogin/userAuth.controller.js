const { Product } = require("../models/product.model.js");
const { User } = require("../models/user.model.js");

const userLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName: userName });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "Couldn't retrieve user details" });
  }
};

module.exports = { userLogin };
