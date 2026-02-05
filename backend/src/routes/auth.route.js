import express from "express";
import { login } from "../controllers/auth.controller";

const router = express.Router();

// Login endpoint
router.post("/login", login);

export default router;