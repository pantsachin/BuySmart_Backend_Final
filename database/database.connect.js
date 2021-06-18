const mongoose = require("mongoose");

async function initializeDBConnection() {
  const uri =
    "mongodb+srv://dbSachin:mongodbsachin@cluster0.vixsn.mongodb.net/buysmart";

  try {
    const response = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("error", error);
    console.log("Error connecting to the database");
  }
}

module.exports = { initializeDBConnection };
