const { Product } = require("../models/product.model.js");
const { User } = require("../models/user.model.js");

const ObjectId = require("mongodb").ObjectID;

const addToWishList = async (req, res) => {
  const { userName, productId } = req.body;
  console.log("productId", productId);

  try {
    const user = await User.findOne({ userName: userName });
    const productToBeAdded = await Product.findById({
      _id: ObjectId.parse(productId),
    });

    if (user.wishlist.find(productId)) {
      res.status(200).json({
        success: false,
        message: "The product already exists in your wishlist!",
      });
    } else {
      const addToWishList = await User.findByIdAndUpdate(
        user._id,
        { $push: { wishlist: productId } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Product added successfully to the wishlist",
      });
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: true, message: "couldn't add product to the wishlist" });
  }
};

module.exports = { addToWishList };
