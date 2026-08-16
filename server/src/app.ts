import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { view } from "./middleware/console.middleware";
import { CLIENT_ORIGIN } from "./configs/env";

export const app = express();

app.set("trust proxy", 1);

if (!CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN is missing");
}


const allowedOrigins = [
  "http://localhost:5173",
  CLIENT_ORIGIN,
  "https://onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // 1. Allow Postman, mobile apps, or headless servers (where origin is undefined)
      if (!origin) return callback(null, true);

      // 2. Allow if it explicitly matches our allowed origins list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 3. IMPORTANT TRICK FOR VERCEL REWRITES:
      // If Vercel modifies the Origin to include your deployment domain string, allow it
      if (origin.includes("vercel.app") || (CLIENT_ORIGIN && origin.includes(CLIENT_ORIGIN.replace(/^https?:\/\//, '')))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS policy blocked request from: ${origin}`));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(view());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1", routes);
