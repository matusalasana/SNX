import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  ACCESS_TOKEN_EXP,
  REFRESH_TOOEN_EXP,
} from "../config/env";

interface UserPayload {
  id: string,
  email: string,
  role: string
}

if(!JWT_SECRET || !ACCESS_TOKEN_EXP || !REFRESH_TOOEN_EXP){
  throw new Error("Missing .env variables for generating tokens");
}

const accessTokenExpirationDate = { expiresIn: ACCESS_TOKEN_EXP };
const refreshTokenExpirationDate = { expiresIn: REFRESH_TOOEN_EXP };

export const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(
    payload, 
    JWT_SECRET, 
    accessTokenExpirationDate
  );
};

export const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(
    payload,
    JWT_SECRET,
    refreshTokenExpirationDate
  );
};