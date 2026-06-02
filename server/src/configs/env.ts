import dotenv from "dotenv";
dotenv.config();

// Basic
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
export const SERVER_ORIGIN = process.env.SERVER_ORIGIN ||  "http://localhost:3000";

// JWT 
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

// Cookie 
export const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 1000*60*60*24*7;

// Salt rounds
export const SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS) || 12;

// Cloudinary image management
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;