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

const removeItemFromCart = async (req, res) => {
  const { userName, productId } = req.body;

  try {
    const user = await User.findOne({ userName: userName });
    const cartToBeUpdated = await Cart.findOne({ userId: user._id });
    const productToBeRemoved = await Product.findOne({ _id: productId });

    console.log("productToBeRemoved", productToBeRemoved._id);

    cartToBeUpdated.cartItems.update(
      { product: productToBeRemoved._id },
      { $pull: { product: productToBeRemoved._id } }
    );

    // const newCart = cartToBeUpdated.cartItems.filter(
    //   (item) => String(item.product) !== String(productToBeRemoved._id)
    // );

    // const newCart = await cartToBeUpdated.cartItems.remove({
    //   product: productToBeRemoved._id,
    // });

    cartToBeUpdated.save();

    console.log("newCart", newCart);

    // await newCart.save();

    const updatedCartToBeSent = await Cart.findOne({
      userId: user._id,
    }).populate("cartItems.product");

    res.status(200).json({ success: true, updatedCartToBeSent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        "Couldn't remove the Item from the Cart, Please try again afetr some time!",
    });
  }
};

module.exports = { addItemToCart, removeItemFromCart };
