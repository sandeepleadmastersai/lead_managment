import express from "express";
import leadRoutes from "./lead.route.js";
import authRoutes from "./auth.route.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/leads", auth, leadRoutes);

export default router;