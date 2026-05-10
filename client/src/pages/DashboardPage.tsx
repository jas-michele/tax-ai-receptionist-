import { useEffect, useState } from "react";

type Inatke = {
    id: number;
    status: string,

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

    function updateStatus(
        id: number,
        newStatus: string
    ) {
        const updatedIntakes = intakes.map((intake) => {

            if (intake.id === id) {

                return {
                    ...intake,
                    status: newStatus,
                };
            }

            return intake;
        })

        setIntakes(updatedIntakes)
    }


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

                    <p className="status-badge">
                        {intake.status}
                    </p>

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

                    <div className="button-group">

                        <button 
                            onClick={() =>
                                updateStatus(
                                    intake.id,
                                    "called"
                                )
                            }
                            >
                                Mark Called
                            </button>

                            <button 
                                onClick={() => 
                                    updateStatus(
                                        intake.id,
                                        "Appointment Scheduled"
                                    )
                                }
                                >
                                    Schedule Appointment
                                </button>

                             <button
                                onClick={() => 
                                    updateStatus(
                                        intake.id,
                                        "Documents Pending"
                                    )
                                }  
                             >
                                Documents Pending
                                </button>    
                    </div>

                </div>

            ))}


        </div>
    );

}