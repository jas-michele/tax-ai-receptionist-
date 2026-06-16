import type { RefundResponse } from "../types/RefundResponse";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type EstimateInput = {
    income: string;
    dependents: string;

}

export async function getEstimate({
    income,
    dependents
}: EstimateInput): Promise<RefundResponse> {
    
    const response = await fetch(
        `${API_URL}/estimate`,
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