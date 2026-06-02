import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  JWT_SECRET,
  JWT_EXPIRY,
  SALT_ROUNDS
} from "../configs/env";

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

export const generateToken = (payload: { userId: string; username: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
