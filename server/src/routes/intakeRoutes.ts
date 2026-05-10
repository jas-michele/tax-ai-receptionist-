import express from "express";
import { createIntake, getIntakes } from "../controllers/intakeController";

const router = express.Router();

router.post("/", createIntake);

router.get("/", getIntakes)

export default router;