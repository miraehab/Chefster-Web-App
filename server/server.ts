import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import { db} from "./datastore";

export const createServer = async (dbPath: string, logRequests: boolean) => {
  dotenv.config();

  const app: Application = express();
  app.use(express.json());

  app.get("/recipes", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: "OK" });
  });

  //app.use("/api/v1", routes);

  return http.createServer(app);
};