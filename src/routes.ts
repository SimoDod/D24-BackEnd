import { Router } from "express";
import authController from "./controllers/authController.js";

const router = Router();

router.use("/auth", authController);

router.all("*", (req, res) => {
  res.render("404");
});

export default router;
