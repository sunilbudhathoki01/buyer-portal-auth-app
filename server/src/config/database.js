import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connection:${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default databaseConnection;
