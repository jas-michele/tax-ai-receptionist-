import express from "express";
import { submitIntake } from "../controllers/intakeController";

const router = express.Router();

router.post("/", submitIntake);

export default router;