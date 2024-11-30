import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import errMsg from "../utils/errorConstants";
import User from "../models/User";

const router = express.Router();

router.get(
  "/admins",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const users = await User.find({
        role: { $in: ["centralAdmin", "localAdmin"] },
      });

      if (!users) {
        throw new Error(errMsg.notFound);
      }

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
