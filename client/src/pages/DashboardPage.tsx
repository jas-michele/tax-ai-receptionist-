import { useEffect, useState } from "react";

type Intake = {
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

    const [intakes, setIntakes] = useState<Intake[]>([]);
    const [conversations, setConversations] = useState<any[]>([]);

    const [
        selectedConverstaion,
        setselectedConverstaion] = useState<any | null>(null);
    

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

    useEffect(() => {

        async function fetchConversations() {

            try {
                const response = await fetch(
                    "http://localhost:5000/chat/conversations"
                );

                const data = await response.json();

                console.log(data);

                setConversations(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchConversations();

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

            {conversations.map((conversation, index) => (

                <div key={index}>

                    <h3>
                        Session:
                        {conversation.sessionId}
                    </h3>

                    <p>
                        Lead Summary:
                        {""}
                        {conversation.summary ||
                        "No summary available yet"}
                    </p>

                    <button
                        onClick={() => 
                            setselectedConverstaion(
                                conversation
                            )
                        }
                    >
                        
                        View Conversation
                    </button>    

                </div>

            ))}

            {selectedConverstaion && (

                <div
                    style={{
                        border: "2px solid black",
                        padding: "20px",
                        marginTop: "20px",
                    }}
                >

                    <h2>
                        Conversation Transcript
                    </h2>

                    {selectedConverstaion.messages.map(
                        (
                            msg: any,
                            index: number
                        ) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                }}
                            >
                                <strong>
                                    {
                                        msg.role === "user"
                                            ? "User"
                                            :"AI"
                                    }
                                </strong>

                                <p>
                                    {msg.content}
                                </p>
                            </div>    
                        )
                    )}
                </div>    
            )}


        </div>
    );

}