/* eslint-disable no-console */
import e from "express";
import mongoose from "mongoose";
import configExpress from "./src/configExpress.js";
import dotenv from "dotenv";
import errMsg from "./src/utils/errorConstants.js";

dotenv.config();

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(errMsg.mongoUriNotDefined);
}

const app = e();

configExpress(app);

mongoose
  .connect(mongoUri)
  .then(() => console.log("DB connected successfully"))
  .then(() => {
    app.listen(port, () => console.log(`server is listening on ${port}...`));
  })
  .catch(() => console.log("Error connecting to the DB"));
