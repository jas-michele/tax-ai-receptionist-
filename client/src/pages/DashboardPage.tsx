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

            <h1 className="dashboard-title">Client Dashboard</h1>

            <h1 className="dashboard-section-title">
                Intake Form Leads
            </h1>

            <div className="dashboard-grid">

                {intakes.map((intake) => (

                    <div
                        key={intake.id}
                        className="dashboard-card"
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


            <h2 className="dashboard-section-title">
                AI Receptionist Leads
            </h2>

            <div className="dashboard-grid">

                {conversations.map((conversation, index) => (

                    <div key={index}
                        className="dashboard-card"
                    >

                        <h3>
                            AI Lead Session
                        </h3>

                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "16px" }}>
                            {conversation.sessionId}
                        </p>

                        <p className="lead-summary">
                            <strong>Lead Summary:</strong>

                            {" "}
                            {conversation.summary ||
                                "No summary available yet"}
                        </p>

                        <p>
                            <strong> Name: </strong>
                            {" "}
                            {conversation.leadData?.fullName || "N/A"}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            {" "}
                            {conversation.leadData?.email || "N/A"}
                        </p>

                        <p>
                            <strong>Tax Type:</strong>
                            {" "}
                            {conversation.leadData?.taxType || "N/A"}
                        </p>

                        <button
                            onClick={() =>
                                setselectedConverstaion(
                                    conversation
                                )
                            }
                            className="primary-button"
                        >

                            View Conversation
                        </button>

                    </div>

                ))}
            </div>

            {selectedConverstaion && (

                <div className="modal-overlay">

                    <div
                        className="transcript-modal"
                    >

                    
                     <div className="transcript-header">

                        <h2>
                            Conversation Transcript
                        </h2>

                         <button
                            className="close-button"
                            onClick={() =>
                                setselectedConverstaion(null)
                            }
                        >
                            ✕
                        </button>

                        </div>

                        {selectedConverstaion.messages.map(
                            (
                                msg: any,
                                index: number
                            ) => (
                                <div
                                    key={index}
                                    className={
                                        msg.role === "user"
                                            ? "transcript-message user"
                                            : "transcript-message ai"
                                    }
                                >
                                    <strong>
                                        {
                                            msg.role === "user"
                                                ? "User"
                                                : "AI"
                                        }
                                    </strong>

                                    <p>
                                        {msg.content}
                                    </p>
                                </div>
                            )
                        )}

                    </div>
                </div>
            )}


        </div>
    );

}