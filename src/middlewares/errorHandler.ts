import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import errMsg from "../utils/errorConstants";
import type { MongoError } from "../types/MongoError";

const errorHandler = (
  err: MongoError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {

  // Duplicate key error (MongoDB code 11000)
  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json({
      error: `${errMsg.duplicateValue} ${field}`,
      message: `${errMsg.duplicateValue} ${field} `,
    });
  }

  // Validation error (Mongoose validation)
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(
      ({ message }: { message: string }) => message,
    );

    return res.status(400).json({
      error: errMsg.validationError,
      details: messages,
    });
  }

  // Invalid credentials
  if (err.message === errMsg.invalidCredentials) {
    return res.status(401).json({
      error: errMsg.somethingWrong,
      message: errMsg.invalidCredentials,
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    error: errMsg.somethingWrong,
    message: err.message || errMsg.internalError,
  });
};

export default errorHandler;
