import dotenv from "dotenv";
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = Number(process.env.PORT) || 3333;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP || "15m";
export const REFRESH_TOOEN_EXP = process.env.REFRESH_TOOEN_EXP || "7d";