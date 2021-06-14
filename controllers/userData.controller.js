const { User } = require("../models/user.model.js");
const { Cart } = require("../models/cart.model.js");
const { wishList } = require("../models/wishList.js");

const createNewUserOnSignUp = async (req, res) => {
  console.log(req.body);

  try {
    const NewUser = new User(req.body);
    const savedUser = await NewUser.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    console.log("error occured in saving the new user details", error);
    res
      .status(500)
      .json({ success: false, message: "couldn't save the new user details" });
  }
};

const getUserDataOnLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName: userName })
      .populate("wishList")
      .populate("cart")
      .exec();
    const cart = await Cart.findOne({ userId: user._id }).populate(
      "cartItems.product"
    );
    const wishList = await WishList.findOne({ userId: user.id }).populate(
      "userWishListItems"
    );

    res.status(200).json({ success: true, user, cart, wishList });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      sucess: false,
      message: "Couldn't fetch User Data on Login! Please try again",
    });
  }
};

module.exports = { createNewUserOnSignUp, getUserDataOnLogin };
