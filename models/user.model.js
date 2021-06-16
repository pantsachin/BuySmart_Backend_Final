const mongoose = require("mongoose");
const { Product } = require("./product.model.js");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  wishList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
