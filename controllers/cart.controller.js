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
    // user.cart.remove(productObjectId);
    // const saveUser = await user.save();

    const updatedCart = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { cart: { product: productObjectId } },
      },
      { new: true }
    )
      .select("cart")
      .populate("cart.product", "-__v");

    res.status(200).json({
      success: true,
      message: "Item removed from the cart successfully",
      updatedCart,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Couldn't remove Item from the cart, please try again later",
    });
  }
};

const increaseQuantity = async (req, res) => {
  const { userName, productId } = req.body;
  const productObjectId = mongoose.Types.ObjectId(productId);

  try {
    const user = await User.findOne({ userName: userName });
    console.log("user", user);

    user.cart.find(
      (item) => String(item.product) === String(productObjectId)
    ).individualQuantity =
      user.cart.find((item) => String(item.product) === String(productObjectId))
        .individualQuantity + 1;

    console.log("user", user);

    const saveUser = await user.save();
    res.status(200).json({ success: true, saveUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Couldn't increase the quantity of the item, please try again!",
    });
  }
};

const decreaseQuantity = async (req, res) => {
  const { userName, productId } = req.body;
  const mongoObjectId = mongoose.Types.ObjectId(productId);

  try {
    const user = await User.findOne({ userName: userName });
    const quantity = user.cart.find(
      (item) => String(item.product) === String(mongoObjectId)
    ).individualQuantity;

    console.log("quantity", quantity);
    console.log(typeof quantity);

    if (quantity === 1) {
      //   user.cart.remove(mongoObjectId);
      //   const saveUser = await user.save();

      const updatedCart = await User.findByIdAndUpdate(
        user._id,
        {
          $pull: { cart: { product: mongoObjectId } },
        },
        { new: true }
      )
        .select("cart")
        .populate("cart.product", "-__v");

      res.status(200).json({
        success: true,
        updatedCart,
        message:
          "Item quantity decreased successfully and if it was 1 then removed successfully",
      });
    } else {
      user.cart.find(
        (item) => String(item.product) === String(mongoObjectId)
      ).individualQuantity =
        user.cart.find((item) => String(item.product) === String(mongoObjectId))
          .individualQuantity - 1;
      const saveUser = await user.save();
      res.status(200).json({
        success: true,
        saveUser,
        message:
          "Item quantity decreased successfully and if it was 1 then removed successfully",
      });
    }

    // res.status(200).json({
    //   success: true,
    //   saveUser,
    //   message:
    //     "Item quantity decreased successfully and if it was 1 then removed successfully",
    // });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message:
        "Couldn't decrease the quantity of the item, please try again later",
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
};
