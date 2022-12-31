import { Request, Response, NextFunction } from "express";
import {
    lastMessageSentToRecipient,
    createMessage,
    putMessageIntoRecipientTable,
} from "./service";

export async function sendMessage(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { creatorId, userMessage, recipientId } = req.body;
    let { groupId } = req.body;
    let parentId: number | null;

    if (
        groupId === undefined ||
        typeof groupId === "string" ||
        groupId instanceof String
    ) {
        res.status(400).json({ message: "invalid type of groupId" });
        return;
    }

    try {
        const lastMessageId = await lastMessageSentToRecipient(
            creatorId,
            recipientId,
        );

        if (!lastMessageId) {
            parentId = null;
        } else {
            parentId = lastMessageId.id;
        }

        const { id } = await createMessage(creatorId, parentId, userMessage);
        await putMessageIntoRecipientTable(groupId, recipientId, id);

        res.status(200).json({
            messageId: id,
            success: true,
        });
        return;
    } catch (err) {
        next(err);
    }
}
