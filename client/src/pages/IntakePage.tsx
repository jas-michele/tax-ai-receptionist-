import { useState } from "react";
import { getEstimate } from "../services/estimateService";
import { formatCurrency } from "../utils/formatCurrency";
import { submitIntake } from "../services/intakeService";


export default function IntakePage() {

    const [income, setIncome] = useState("");
    const [dependents, setDependents] = useState("");
    const [refund, setRefund] = useState<number | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        try {

             await submitIntake({
                firstName,
                lastName,
                phone,
                income,
                dependents
            });

            const estimateData = await getEstimate({
                income,
                dependents
            })

            setRefund(estimateData.estimatedRefund)

            setSuccessMessage(
                "Intake form submitted successfully"
            )

        } catch (error) {
            console.error(error);

            setErrorMessage(
                "Something went wrong submitting the form"
            )

        }
    };


    return (
        <div>
            <h1>Tax Intake Form</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>First Name</label>

                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Last Name</label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => 
                            setLastName(e.target.value)
                        }
                    />    
                </div>

                <div>
                    <label>Phone</label>

                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => 
                            setPhone(e.target.value)
                        }
                    />    
                </div>

                <div>
                    <label>Income</label>

                    <input
                        type="number"
                        value={income}
                        onChange={(e) =>
                            setIncome(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Dependents</label>

                    <input
                        type="number"
                        value={dependents}
                        onChange={(e) =>
                            setDependents(e.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    Submit Intake Form
                </button>

            </form>

            {successMessage && (
                <p>{successMessage}</p>
            )}

            {errorMessage && (
                <p>{errorMessage}</p>
            )}

            {refund !== null && (

                <h2>
                    Estimated Refund: ${formatCurrency(refund)}
                </h2>
            )}

        </div>
    );
}

