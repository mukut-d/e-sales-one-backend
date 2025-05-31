const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in env variables");
    }

    console.log("Attempting to conncet to MONGODB...");
    console.log("uri: ", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected succesfully");
  } catch (error) {
    console.log("Mongodb connection error", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
