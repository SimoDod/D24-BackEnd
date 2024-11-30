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
    const { name } = req.body;

    try {
      const office = await Office.create({ name });

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
        return res.status(404).json({ message: errMsg.officeNotFound });
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
    const officeId = req.params.id;

    try {
      const office = await Office.findByIdAndDelete(officeId);

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

router.post(
  "/create-segment",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { selectedTechBuckets, name } = req.body;

    try {
      const segment = await Segment.create({
        selectedTechBuckets,
        name,
      });

      const pupulatedSegment = await segment.populate("selectedTechBuckets");

      return res.status(201).json(pupulatedSegment);
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
        return res.status(404).json({ message: errMsg.segmentNotFound });
      }

      return res.status(200).json(segment);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-segment/:id",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const segmentId = req.params.id;

    try {
      const segment = await Segment.findByIdAndDelete(segmentId);

      if (!segment) {
        return res.status(404).json({ message: errMsg.segmentNotFound });
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

router.post(
  "/create-techBucket",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
      const techBucket = await TechBucket.create({ name });

      return res.status(201).json(techBucket);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update-techBucket",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const id = req.body.id;

    try {
      const techBucket = await TechBucket.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true },
      );

      if (!techBucket) {
        return res.status(404).json({ message: errMsg.techBucketNotFound });
      }

      return res.status(200).json(techBucket);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-techBucket/:id",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const techBucketId = req.params.id;

    try {
      const techBucket = await TechBucket.findByIdAndDelete(techBucketId);

      if (!techBucket) {
        return res.status(404).json({ message: errMsg.techBucketNotFound });
      }

      return res.status(200).json(techBucket);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
