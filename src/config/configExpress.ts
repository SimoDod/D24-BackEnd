import bodyParser from "body-parser";
import type { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const configExpress = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  return app;
};

export default configExpress;
