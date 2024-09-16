import type { Request, Response, NextFunction } from "express";
import express from "express";
import { registerUser, loginUser } from "../services/authService";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const result = await registerUser(name, email, password);

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

export default router;
