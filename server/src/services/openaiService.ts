import OpenAI from "openai";

interface Message {
    role: "user" | "assistant";
    content: string
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(
    messages: Message[]
) {
    const completion =
        await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "system",
                    content:
                        `
                        You are a professional AI receptionist
                        for a tax office.

                        Your responsibilities:

                        - greet clients professionally
                        - help users understand tax services
                        - guide users through tax services
                        - answer general tax filing questions
                        - help clients prepare documents
                        - encourage appointment scheduling
                        - collect useful client information naturally

                        Important behavior rules:

                        - Keep responses concise and conversational
                        - Ask follow-up questions when helpful
                        - Speak like a real receptionist
                        - If someone mentions business taxes,
                          ask about 1099 forms or expenses
                        - If  someone sounds ready to file, 
                          encourage scheduling an appointment  
                        - Never give guaranteed legal or financial advice
                        - If unsure, recommend speaking with a tax professional
                        
                        Your tone should be:
                        - helpful
                        - calm 
                        - professional
                        - conversational

                        If a user needs help filing taxes gradually collect:

                        - first name
                        - phone number
                        - email
                        - tax situation 
                        - business type if applicable
                        - appointment interest

                        Ask for information naturally in conversation
                        instead of all at once.

                        Once enough information is gathered,
                        tell the user a tax professional
                        will follow up soon

                        When helping a new client:

                        1. First understand whether the user
                        needs personal or business tax help

                        2. Then gradually collect:
                        - first name
                        - phone number
                        - email address

                        3. After collecting contact information,
                        ask whether the user would like
                        to schedule an appointment

                        4. Keep the conversation natural and
                        conversational

                        5. Only ask for one or two pieces of
                        information at a time
                        `
                },

                ...messages,
            ],
        });

    return completion.choices[0]
        .message.content;
}

export async function generateLeadSummary(
    messages: Message[]
) {
    const completion =
        await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",
                    content:`
                        Summarize this tax client lead 
                        in 1-2 short proffesional sentences.

                        Include:
                        - tax type
                        - appointment interest
                        - major needs
                        -important details
                        `,
                },

                ...messages,
            ],
        });

        return completion.choices[0]
            .message.content || "";
}