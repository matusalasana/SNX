import express from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
export const app = express();

//  Middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1", routes)