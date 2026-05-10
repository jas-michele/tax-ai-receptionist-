import { useEffect, useState } from "react";

type Inatke = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    income: string;
    dependents: string;
};

export default function DashboardPage() {

    const [intakes, setIntakes] = useState<Inatke[]>([]);

    useEffect(() => {
        async function fetchIntake() {
            try {
                const response = await fetch(
                    "http://localhost:5000/intake"
                );

                const data = await response.json();

                console.log(data);

                setIntakes(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchIntake();
    }, []);


    return (

        <div className="dashboard-container">

            <h1 className="dashboard-grid">Client Dashboard</h1>

            {intakes.map((intake) => (

                <div
                    key={intake.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >

                    <h3>
                        {intake.firstName}
                        {" "}
                        {intake.lastName}
                    </h3>

                    <p>
                        Phone:
                        {" "}
                        {intake.phone}
                    </p>

                    <p>
                        Email:
                        {" "}
                        {intake.email}
                    </p>

                    <p>
                        Income:
                        {" "}
                        {intake.income}
                    </p>

                    <p>
                        Dependents:
                        {" "}
                        {intake.dependents}
                    </p>

                </div>
            ))}

        </div>
    );

}