import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import Office from "../models/Office";
import Segment from "../models/Segment";
import TechBucket from "../models/TechBucket";
import errMsg from "../utils/errorConstants";

const router = express.Router();

router.get(
  "/allOffices",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const offices = await Office.find().lean();

      return res.status(200).json(offices);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create-office",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const office = await Office.create(req.body);

      return res.status(201).json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update-office",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const office = await Office.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
        },
        { new: true, runValidators: true },
      );

      if (!office) {
        return res.status(404).json({ message: "Office not found" });
      }

      return res.status(200).json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-office/:id",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const office = await Office.findByIdAndDelete(req.params.id);

      if (!office) {
        return res.status(404).json({ message: errMsg.officeNotFound });
      }

      return res.status(200).json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/allSegments",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const segments = await Segment.find()
        .populate("selectedTechBuckets")
        .exec();

      return res.status(200).json(segments);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update-segment/:segmentId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { name, selectedTechBuckets } = req.body;
      const segmentId = req.params.segmentId;
      const updateData = {
        ...(name && { name }),
        ...(selectedTechBuckets?.length > 0 && {
          selectedTechBuckets,
        }),
      };

      const segment = await Segment.findByIdAndUpdate(segmentId, updateData, {
        new: true,
        runValidators: true,
      }).populate("selectedTechBuckets");

      if (!segment) {
        return res.status(404).json({ message: "Segment not found" });
      }

      return res.status(200).json(segment);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/allTechBuckets",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const techBuckets = await TechBucket.find().lean();

      return res.status(200).json(techBuckets);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
