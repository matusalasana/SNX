import express from "express";
// import routes from "./routes/index";
import cors from "cors";


export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// app.use("/api/v1", routes);