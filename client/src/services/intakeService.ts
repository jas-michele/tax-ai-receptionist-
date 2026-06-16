const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


type IntakeData = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    income: string;
    dependents: string;
};

export async function submitIntake(
    intakeData: IntakeData
) {
    const response = await fetch(
        `${API_URL}/intake`,
      {
        method: "POST",

        headers: {
            "Content-type": "application/json",
        },

        body: JSON.stringify(intakeData),
      }  
    );

    if (!response.ok) {
        throw new Error("Failed to submit intake form")
    }

    return response.json();
}