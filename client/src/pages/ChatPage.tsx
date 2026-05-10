import { useState } from "react";

export default function ChatPage() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<string[]>([]);

    async function handleSendMessage() {

        if (!message.trim()) return;

        const userMessage = message;

        setMessages([
            ...messages,
            `You: ${userMessage}`,
        ]);

        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:5000/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        message: userMessage,
                    }),
                }
            );

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                `AI: ${data.reply}`,
            ]);

        } catch (error) {

            console.error(error);
        }
    }

    return (

        <div className="chat-container">

            <h1>AI Receptionist</h1>

            <div className="chat-box">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className="chat-message"
                    >
                        {msg}
                    </div>
                ))}

            </div>

            <div className="chat-input-container">

                <input
                    type="text"
                    value={message}
                    placeholder="Ask a tax question..."

                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                />

                <button
                    onClick={handleSendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );

}