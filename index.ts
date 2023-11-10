import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { controllersFactory } from "./controllers/controllerFactory";
import { createRoutes } from "./routes";
import { connect } from "./database/mongoose";
dotenv.config();
connect();
const app: Express = express();
const port = process.env.PORT;

const controllers = controllersFactory();
app.use(express.json());

app.use("/api", createRoutes(controllers));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app };
