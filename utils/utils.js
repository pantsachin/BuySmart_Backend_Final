const fakeProducts = require("../data/productDataBase.js");

const { Product } = require("../models/product.model.js");

function populateProductsCollection() {
  try {
    fakeProducts.forEach(async (product) => {
      const newProduct = new Product(product);
      const savedProduct = newProduct.save();
      console.log(savedProduct);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = populateProductsCollection;
