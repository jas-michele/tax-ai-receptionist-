import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {

    const { message } = req.body;

    res.status(200).json({
        reply: `AI Receptionis received: ${message}`
    });
});

export default router;