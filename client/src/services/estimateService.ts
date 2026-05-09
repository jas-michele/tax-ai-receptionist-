import type { RefundResponse } from "../types/RefundResponse";

type EstimateInput = {
    income: string;
    dependents: string;

}

export async function getEstimate({
    income,
    dependents
}: EstimateInput): Promise<RefundResponse> {
    
    const response = await fetch(
        "http://localhost:5000/estimate",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                income,
                dependents
            }),
          }
       );

       return response.json();
}