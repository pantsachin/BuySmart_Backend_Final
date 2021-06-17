const { Product } = require("../models/product.model.js");
const { User } = require("../models/user.model.js");

const mongoose = require("mongoose");

const addToWishList = async (req, res) => {
  const { userName, productId } = req.body;
  const mongoObjectId = mongoose.Types.ObjectId(productId);
  // console.log(typeof mongoObjectId);
  // console.log({ mongoObjectId });

  try {
    const user = await User.findOne({ userName: userName });
    const productToBeAdded = await Product.findById({
      _id: mongoObjectId,
    });

    console.log({ productToBeAdded });
    const checker = user.wishList.find(
      (item) => String(item) === String(mongoObjectId)
    );

    console.log("checker", checker);

    if (checker) {
      res.status(200).json({
        success: false,
        message: "The product already exists in your wishlist!",
      });
    } else {
      // This didn't work
      // const addToWishList = await User.findByIdAndUpdate(
      //   user._id,
      //   { $push: { wishlist: productId } },
      //   { new: true }
      // );
      user.wishList.push(productToBeAdded._id);
      const saveUser = await user.save();

      res.status(200).json({
        success: true,
        message: "Product added successfully to the wishlist",
        saveUser,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "couldn't add product to the wishlist",
    });
  }
};

const removeFromWishList = async (req, res) => {
  const { userName, productId } = req.body;
  const mongoObjectId = mongoose.Types.ObjectId(productId);

  try {
    const user = await User.findOne({ userName: userName });
    const productToBeRemoved = await Product.findById({ _id: mongoObjectId });

    console.log({ productToBeRemoved });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message:
          "Couldn't remove the item from the wishList, please try again!",
      });
  }
};

// const removeFromWishList = async (req, res) => {
//   const { userName, produictId } = req.body;
//   console.log("productId", productId);

//   try {
//        const user = await User.findOne({ userName: userName });
//     const productToBeAdded = await Product.findById({
//       _id: ObjectId.parse(productId),
//     });

//   }

// }

module.exports = { addToWishList };
