import { useState, useRef, useEffect } from "react";
import type { Message } from "../types/chat.ts"


export default function ChatPage() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([]);

    const [sessionId] = useState(() => crypto.randomUUID());

    const [islistening, setIsListening] = useState(false);

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages])


    async function handleSendMessage() {

        if (!message.trim() || loading) return;

        const userMessage: Message = {
            role: "user",
            content: message,
            timestamp: new Date().toLocaleTimeString()
        };

        const updatedMessages = [
            ...messages,
            userMessage,
        ]

        setMessages(updatedMessages)

        setMessage("");

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        sessionId,
                        messages: updatedMessages,
                    }),
                }
            );


            const data = await response.json();

            console.log(data);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.aiReply,
                }

            ]);

            setLoading(false);

            inputRef.current?.focus();

        } catch (error) {

            console.error(error);

            setLoading(false)
        }
    }

    function startListening() {

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition not supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.start();

        setIsListening(true);

        recognition.onresult = (event: any) => {

            let transcript =
                event.results[0][0].transcript;

            transcript = transcript
                .replace(/\sat\s/g, "@")
                .replace(/\sdot\s/g, ".")


            setMessage(transcript);

            setIsListening(false);
        };

        recognition.onerror = () => {

            setIsListening(false);
        };

        recognition.onend = () => {

            setIsListening(false)
        };

    }


    return (

        <div className="chat-container">

            <h1>AI Receptionist</h1>

            <div className="chat-box">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.role === "user"
                                ? "chat-message user"
                                : "chat-message ai"
                        }
                    >
                        <strong>
                            {msg.role === "user"
                                ? "You"
                                : "AI"}
                        </strong>

                        {" "}
                        {msg.content}

                        <p className="message-time">
                            {msg.timestamp}
                        </p>
                    </div>
                ))}

                {loading && (
                    <div className="chat-message ai">
                        AI is typing...
                    </div>
                )}

                <div ref={chatEndRef} />

            </div>

            <div className="chat-input-container">

                <input
                    type="text"
                    value={message}
                    placeholder="Ask a tax question..."
                    ref={inputRef}

                    onChange={(e) =>
                        setMessage(e.target.value)
                    }

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                />

                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>

                <button
                    onClick={startListening}
                >
                    {islistening
                        ? "Listening..."
                        : " 🎤 Speak"}
                </button>

            </div>

        </div>
    );

}