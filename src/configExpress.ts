/* eslint-disable @typescript-eslint/naming-convention */
import bodyParser from "body-parser";
import type { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import e from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configExpress = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(e.static(path.join(__dirname, "../dist")));
  app.use("/api", routes);
  /* app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  }); */
  app.use(errorHandler);

  return app;
};

export default configExpress;
