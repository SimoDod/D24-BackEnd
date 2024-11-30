import type { Response, NextFunction } from "express";
import express from "express";
import { createReport, updateReport } from "../services/reportService";
import type { AuthenticatedRequest } from "../types/Authentication";
import errMsg from "../utils/errorConstants";
import Report from "../models/Report";

const router = express.Router();

router.get(
  "/:reportNumber",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const reportNumber = req.params.reportNumber;
      
      if (!reportNumber) {
        return res.status(400).json({ message: errMsg.notFound });
      }

      const report = await Report.findOne({ reportNumber }).lean();

      if (report === null) {
        throw new Error(errMsg.notFound);
      }

      return res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/get/all",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const report = await Report.find({});

      if (!report) {
        throw new Error(errMsg.notFound);
      }

      return res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/submit",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const reportData = req.body;
      const userId = req.user;

      if (!userId) {
        return res.status(400).json({ message: errMsg.userNotFound });
      }

      const report = await createReport(userId, reportData);

      return res.status(201).json(report);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:reportId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const reportId = req.params.reportId;

      if (!reportId) {
        return res.status(400).json({ message: errMsg.notFound });
      }

      const updatedReport = await updateReport(req.body, reportId);

      if (!updatedReport) {
        return res.status(404).json({ message: errMsg.notFound });
      }

      return res.status(200).json(updatedReport);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
