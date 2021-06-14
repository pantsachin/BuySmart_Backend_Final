const { Product } = require("../models/product.model.js");

const getProductsData = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "couldn't fetch data, please try again",
    });
  }
};

module.exports = { getProductsData };
