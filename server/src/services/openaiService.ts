import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(
    message: string
) {
    const completion = 
        await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "system",
                    content:
                        `
                        You are an AI tax receptionist.

                        Help Clients with:
                        - tax intake questions
                        - scheduling
                        - document guidance
                        - general tax office support
                        `
                },

                {
                    role: "user",
                    content: message
                },
            ],
        });

        return completion.choices[0]
            .message.content;
}