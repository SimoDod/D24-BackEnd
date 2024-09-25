import { Router } from "express";
import authController from "./controllers/authController.js";
import adminsController from "./controllers/adminsController.js";
import verifyToken from "./middlewares/verifyToken.js";
import reportController from "./controllers/reportController.js";
import delayResponse from "./middlewares/delayResponse.js";

const router = Router();
const delayResponseMs = 600; // Simulate slow satellite internet speed

router.use("/auth", delayResponse(delayResponseMs), authController);
router.use(
  "/learning-report",
  delayResponse(delayResponseMs),
  verifyToken,
  reportController,
);
router.use(delayResponse(delayResponseMs), adminsController);

export default router;
