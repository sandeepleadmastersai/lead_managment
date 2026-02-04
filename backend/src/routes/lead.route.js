import express from "express";
import { createLead, deleteLead, getLeads, updateLeadStatus } from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.patch("/:id/status", updateLeadStatus);
router.delete("/:id", deleteLead);

export default router;