import express from "express";
import routes from "./routes/index";
import cors from "cors";
import { CLIENT_ORIGIN } from "./configs/env"


export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  CLIENT_ORIGIN,
];
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use("/api/v1", routes);