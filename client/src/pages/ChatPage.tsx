import { useState } from "react";

export default function ChatPage() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<string[]>([]);

    function handleSendMessage() {

        if (!message.trim()) return;

        setMessages([
            ...messages,
            message,
        ]);

        setMessage("");
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