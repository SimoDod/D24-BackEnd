import type { Request, Response, NextFunction } from "express";
import express from "express";
import { registerUser, loginUser, findUserById } from "../services/authService";
import type { AuthenticatedRequest } from "../types/Authentication";
import errMsg from "../utils/errorConstants";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const result = await registerUser(username, email, password);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/me",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user;

      if (!userId) {
        return res.status(400).json({ message: errMsg.userIdNotFound });
      }

      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: errMsg.userNotFound });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
