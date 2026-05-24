import bcrypt from "bcryptjs";
import {
  SALT_ROUNDS
} from "../config/env"


export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};



export const hashToken = async (token: string) => {
  return await bcrypt.hash(token, SALT_ROUNDS);
};

export const compareToken = async (token: string, hash: string) => {
  return await bcrypt.compare(token, hash);
};
