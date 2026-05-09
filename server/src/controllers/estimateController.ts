import { Request, Response } from "express";
import { calculateRefund } from "../calculators/refundCalculator";

export const estimateRefund = (
  req: Request,
  res: Response
) => {


  const income = Number(req.body.income);
  const dependents = Number(req.body.dependents);


  const estimatedRefund = calculateRefund({
    income,
    dependents,
  });

  console.log("REFUND:", estimatedRefund);

  res.json({
    estimatedRefund,
  });
};