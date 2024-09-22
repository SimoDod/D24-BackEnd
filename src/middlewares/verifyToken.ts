import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import errMsg from "../utils/errorConstants";
import type { AuthenticatedRequest } from "../types/Authentication";

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: errMsg.missingToken });
  }

  const token = authHeader.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: errMsg.failAcquireToken });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };

    req.user = decoded.userId;

    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return res.status(403).json({ message: errMsg.invalidToken });
  }
};

export default verifyToken;
