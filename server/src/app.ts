import express from "express";
import routes from "./routes/index";


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use("/api/v1", routes);