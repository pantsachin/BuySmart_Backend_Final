const { User } = require("../models/user.model.js");
const { Cart } = require("../models/cart.model.js");
const { WishList } = require("../models/wishlist.model.js");
const { Product } = require("../models/product.model.js");

const addItemToCart = async (req, res) => {
  const { userName, productId } = req.body;

  try {
    const user = await User.findOne({ userName: userName });
    const cartToBeUpdated = await Cart.findOne({ userId: user._id });
    const productToBeAdded = await Product.findOne({ _id: productId });

    cartToBeUpdated.cartItems.push({ product: productToBeAdded._id });

    const saveCart = await cartToBeUpdated.save();
    const updatedCartToBeSent = await Cart.findOne({
      userId: user._id,
    }).populate("cartItems.product");
    res.status(200).json({ success: true, updatedCartToBeSent });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: fail,
      message: "Couldn't add Item to the cart, please try again!",
    });
  }
};

module.exports = { addItemToCart };
