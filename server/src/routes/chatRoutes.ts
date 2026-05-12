import express from "express";
import { getAIResponse } from "../services/openaiService";
import { saveConversation } from "../services/firestoreService";
import { devNull } from "node:os";
import { db } from "../config/firebase";

const router = express.Router();

console.log("POST HIT");

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

        console.log("Saving conversations...")

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

router.get("/conversations", async (req, res) => {
    
    try {
        const snapshot = await db
            .collection("conversations")
            .get();

        const conversations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        res.json(conversations);
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        });
    }
});

export default router;