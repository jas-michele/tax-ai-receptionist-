import { useState } from "react";

type Message = {
    role: "user" | "ai";
    content: string
}

export default function ChatPage() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([]);

    const [islistening, setIsListening] = useState(false);

    async function handleSendMessage() {

        if (!message.trim()) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage,
            }  
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

            console.log(data);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: data.reply,
                }
              
            ]);

        } catch (error) {

            console.error(error);
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

                const transcript = 
                    event.results[0][0].transcript;

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