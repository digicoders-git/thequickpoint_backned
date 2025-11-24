import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/admin_panel";
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      ssl: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true
    });
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.log("Trying local MongoDB...");
    try {
      await mongoose.connect("mongodb://localhost:27017/admin_panel");
      console.log("Connected to local MongoDB");
    } catch (localError) {
      console.log("Local MongoDB also failed, continuing without database");
    }
  }
};