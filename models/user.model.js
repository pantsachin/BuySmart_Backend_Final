const mongoose = require("mongoose");
const { Product } = require("./product.model.js");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },

  wishList: [{ type: Schema.Types.ObjectId, ref: "Product" }],

  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      individualQuantity: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
