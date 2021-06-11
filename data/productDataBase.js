const faker = require("faker");

faker.seed(123);

const fakeProducts = [...Array(50)].map((item) => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
  discount: faker.random.arrayElement([25, 50, 70, 0]),
  category: faker.random.arrayElement([
    "T-Shirts",
    "Jackets",
    "Shorts",
    "Shoes",
    "Watches",
  ]),
}));

module.exports = fakeProducts;
