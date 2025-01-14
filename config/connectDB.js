const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting Database: ", error.message);
  }
};

module.exports = connectDB;
