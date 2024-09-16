/* eslint-disable no-console */
import e from "express";
import mongoose from "mongoose";
import configExpress from "./config/configExpress.js";
import dotenv from "dotenv";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import errMsg from "./utils/errorConstants.js";

dotenv.config();

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI;

const app = e();

if (!mongoUri) {
  throw new Error(errMsg.mongoUriNotDefined);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("DB connected successfully"))
  .then(() => {
    app.listen(port, () => console.log(`server is listening on ${port}...`));
  });

configExpress(app);

app.use(routes);
app.use(errorHandler);
