import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default function dbConnect() {
  mongoose
    .connect(process.env.SECRET_STRING)
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((error) => {
      console.error("DB connection failed:", error);
      process.exit(1);
    });
}
