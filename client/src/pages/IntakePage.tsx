import { use, useState } from "react";
import { getEstimate } from "../services/estimateService";
import { formatCurrency } from "../utils/formatCurrency";


export default function IntakePage() {

    const [income, setIncome] = useState("");
    const [dependents, setDependents] = useState("");
    const [refund, setRefund] = useState<number | null>(null);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {

            const data = await getEstimate({
                income,
                dependents
            });

            console.log(data);

            setRefund(data.estimatedRefund)

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Tax Intake Form</h1>

            <form onSubmit={handleSubmit}>

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
                    Estimate Refund
                </button>

            </form>

            {refund !== null && (

                <h2>
                    Estimated Refund: ${formatCurrency(refund)}
                </h2>
            )}

        </div>
    );
}

