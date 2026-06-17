import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  JWT_SECRET,
  SALT_ROUNDS
} from "../configs/env";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string, 
  hashed: string ) => {
    try {
    return await bcrypt.compare(password, hashed);
  } catch {
    return false;
  }
};

export const generateToken = (payload: { userId: string; email: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};