import { Request, Response } from "express";
import { saveIntake, getAllIntakes } from "../services/intakeService";
import { data } from "react-router-dom";

export function createIntake(
    req: Request,
    res: Response
) {
    const newdIntake = {
        id: Date.now(),
        ...req.body,
    }

    saveIntake(newdIntake)

    res.status(201).json({
        message: "Intake submitted",
        data: newdIntake,
    });
}

export const getIntakes = (
    req: Request,
    res: Response
) => {

    const intakes= getAllIntakes();

    res.status(200).json(intakes);
}