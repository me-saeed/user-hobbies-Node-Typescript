import mongoose from "mongoose";

const { MONGO_URI } = process.env;

export const connect = () => {
  // Connecting to the database
  mongoose
    .connect("mongodb://localhost:27017/user_hobbies", {})
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed. Exiting now...");
      console.error(error);
      process.exit(1);
    });
};
