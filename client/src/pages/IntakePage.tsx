import { use, useState } from "react";
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
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if(
            !firstName ||
            !lastName ||
            !phone ||
            !email ||
            !income
        ) {
            setErrorMessage("Pleasse fill out all required fields");
            return;
        }

        if (!email.includes("@")) {
            setErrorMessage("Please enter valid email");
            return;
        }

        if (Number(income) < 0) {
            setErrorMessage("Income cannot be negative");
        }
        if (Number(dependents) < 0) {
            setErrorMessage("Dependents cannot be negative");
        }

        setLoading(true);

        try {

             await submitIntake({
                firstName,
                lastName,
                phone,
                email,
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

        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="intake-container">
            <h1>Tax Intake Form</h1>

            <div className="intake-card">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                
                    <label>First Name</label>

                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />
                </div>
            

            <div className="form-group">
                
                    <label>Last Name</label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => 
                            setLastName(e.target.value)
                        }
                    />    
                </div>
                

            <div className="form-group">

                
                    <label>Phone</label>

                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => 
                            setPhone(e.target.value)
                        }
                    />    
                </div>

        

                <div className="form-group">

                
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => 
                            setEmail(e.target.value)
                        }
                    />    
                </div>

            
               
             <div className="form-group">  

                
                    <label>Income</label>

                    <input
                        type="number"
                        value={income}
                        onChange={(e) =>
                            setIncome(e.target.value)
                        }
                    />
                </div>

                

            <div className="form-group">

                
                    <label>Dependents</label>

                    <input
                        type="number"
                        value={dependents}
                        onChange={(e) =>
                            setDependents(e.target.value)
                        }
                    />
                </div>

                

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Intake Form"}
                </button>

            </form>
            </div>

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

