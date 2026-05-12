import express from "express";
import { getAIResponse } from "../services/openaiService";
import { saveConversation } from "../services/firestoreService";

const router = express.Router();

router.post("/", async (req, res) => {
   
    try {

        const { sessionId, messages } = req.body;

        const aiReply = 
            await getAIResponse(messages);

        const updatedMessages = [
            ...messages,
            {
                role: "assistant",
                content: aiReply
            },
        ];

        await saveConversation(
            sessionId,
            updatedMessages
        );

        res.json({
            aiReply,
        })

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            error: error.message
            
        });
    }
})


export default router;