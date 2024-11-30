import type { NextFunction, Request, Response } from "express";

const delayResponse = (delayInMs: number) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
      next();
    }, delayInMs);
  };
};

export default delayResponse;
