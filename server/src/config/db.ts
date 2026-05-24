import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

export const connectMongoDB = async() => {
  try{
    await mongoose.connect(MONGODB_URI)
    console.log("✅ Database Connected Successfully")
  }catch(err){
    console.log("❌ Database connection error:", err);
  }
};