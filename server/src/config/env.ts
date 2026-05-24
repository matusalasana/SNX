import dotenv from "dotenv";
dotenv.config()

export const PORT = Number(process.env.PORT) || 3333;
export const MONGODB_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV || "development";


export const JWT_SECRET = process.env.JWT_SECRET;


export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12;


// TOKENS EXPIRATION DATE
export const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP || "15m";
export const REFRESH_TOOEN_EXP = process.env.REFRESH_TOOEN_EXP || "7d";


// COOKIES EXPIRATION DATE
export const ACCESS_COOKIE_EXP = Number(process.env.ACCESS_COOKIE_EXP) || 900000;
export const REFRESH_COOKIE_EXP = Number(process.env.REFRESH_COOKIE_EXP) || 604800000;