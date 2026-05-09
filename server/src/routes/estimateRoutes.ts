import express from "express";
import { estimateRefund } from "../controllers/estimateController";

const router = express.Router();

router.post("/", estimateRefund);

export default router;