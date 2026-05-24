import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  role: "admin";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    refreshToken: { type: String },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);