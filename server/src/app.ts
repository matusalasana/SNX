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

// Strip any trailing slash to avoid string mismatch with browser Origin headers
const sanitizedClientOrigin = CLIENT_ORIGIN.replace(/\/$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  sanitizedClientOrigin,
  "https://onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, mobile apps, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
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
