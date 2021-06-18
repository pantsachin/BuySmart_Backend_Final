const { Product } = require("../models/product.model.js");
const { User } = require("../models/user.model.js");

const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const { userName, productId } = req.body;

  const productObjectId = mongoose.Types.ObjectId(productId);

  try {
    const user = await User.findOne({ userName: userName });
    const checker = user.cart.find(
      (item) => String(item.product) === String(productObjectId)
    );

    console.log("checker", checker);

    if (checker) {
      res
        .status(200)
        .json({ success: true, message: "the item is already in your cart" });
    } else {
      const updatedCart = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            cart: {
              $each: [{ product: productObjectId, individualQuantity: 1 }],
              $position: 0,
            },
          },
        },
        { new: true }
      )
        .select("cart")
        .populate("cart.product", "-__v");

      // The save() function is generally the right way to update a document with Mongoose
      // user.cart.push({ product: productObjectId });
      // const saveUser = await user.save();

      res.status(200).json({
        success: true,
        message: "Item added to the cart successfully",
        updatedCart,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Couldn't add to the cart, please try again later",
    });
  }
};

const removeFromCart = async (req, res) => {
  const { userName, productId } = req.body;
  const productObjectId = mongoose.Types.ObjectId(productId);

  try {
    const user = await User.findOne({ userName, userName });

    // The save() function is generally the right way to update a document with Mongoose
    user.cart.remove(productObjectId);
    const saveUser = await user.save();

    // const updatedCart = await User.findByIdAndUpdate(
    //   user._id,
    //   {
    //     $pull: { cart: { product: productObjectId } },
    //   },
    //   { new: true }
    // )
    //   .select("cart")
    //   .populate("cart.product", "-__v");

    res.status(200).json({
      success: true,
      message: "Item removed from the cart successfully",
      saveUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Couldn't remove Item from the cart, please try again later",
    });
  }
};

module.exports = { addToCart, removeFromCart };
