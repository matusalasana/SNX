import express from "express";
import routes from "./routes/index";
import cors from "cors";
import { view } from "./middleware/console.middleware"

export const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(view())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use("/api/v1", routes);