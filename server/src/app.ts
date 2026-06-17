import express from "express";
import routes from "./routes/index";
import cors from "cors";
import { CLIENT_ORIGIN } from "./configs/env"


export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  CLIENT_ORIGIN,
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use("/api/v1", routes);