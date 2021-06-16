const { User } = require("./models/user.model.js");

const userIdCheckHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("cart.product")
      .populate("wishlist")
      .exec();

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    } else {
      req.user = user;
    }
  } catch (error) {
    console.log("error", error);
  }
  next();
};
