
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
        "http://localhost:5000/intake",
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