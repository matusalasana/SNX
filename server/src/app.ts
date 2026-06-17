import express from "express";
import routes from "./routes/index";
import cors from "cors";
import { CLIENT_ORIGIN } from "./configs/env"


export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  CLIENT_ORIGIN,
]

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use("/api/v1", routes);