const mongoose = require("mongoose");

const { Schema } = mongoose;

const WishListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  userWishListItems: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList };
