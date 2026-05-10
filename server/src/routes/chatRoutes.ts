import express from "express";
import { getAIResponse } from "../services/openaiService";


const router = express.Router();

router.post("/", async (req, res) => {
   
    try {

        const { message } = req.body;

        const aiReply = 
            await getAIResponse(message);

            res.status(200).json({
                reply: aiReply
            })

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            error: error.message
            
        });
    }
})


export default router;