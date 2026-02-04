import express from "express";
import leadRoutes from "./lead.route.js";

const router = express.Router();

router.use("/leads", leadRoutes);

export default router;