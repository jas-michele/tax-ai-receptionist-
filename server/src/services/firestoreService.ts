import admin from "firebase-admin";

import { ServiceAccount } from "firebase-admin";

import { db } from "../config/firebase";

interface Message {
    role: "user" | "assitant";
    content: string;
}

export async function saveConversation(
    sessionId: string,
    messages: Message[]
) {
    await db
        .collection("conversations")
        .doc(sessionId)
        .set({
            sessionId,
            messages,
            updatedAt: new Date(),
        });
}