const mongoose = require("mongoose");

const connectDb = async (isProd) => {
  try {
    const DB = process.env.DB_CONNECTION_STRING.replace(
      "db_name",
      isProd ? process.env.DB_NAME : process.env.DB_TEST_NAME
    )
      .replace(
        "username",
        isProd ? process.env.DB_USERNAME : process.env.DB_TEST_USERNAME
      )
      .replace(
        "password",
        isProd ? process.env.DB_PASSWORD : process.env.DB_TEST_PASSWORD
      );

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the DB successfully!");

    return mongoose.connection; // Return the connection object
  } catch (error) {
    console.error("Error connecting to the DB:", error.message);
    throw error; // Rethrow the error
  }
};

module.exports = connectDb;
