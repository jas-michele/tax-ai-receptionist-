import { Request, Response } from "express";
import { saveIntake } from "../services/intakeServices";
import { data } from "react-router-dom";

export function submitIntake(
    req: Request,
    res: Response
) {
    const savedIntake = saveIntake(req.body);

    res.json({
        message: "Intake received",
        data: savedIntake,
    });
}