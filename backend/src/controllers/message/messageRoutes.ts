import db from "../../connection";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import {
    lastMessageSentToRecipient,
    createMessage,
    putMessageIntoRecipientTable,
    listOfAllMessagesFromUser,
    listOfLastTenMessagesSent,
} from "./queries/messageQuery";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
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
};

async function sendGroupMessage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { creatorId, userMessage, groupId, recipientId } = req.body;
    let parentId: number | null;
    if (groupId === null || groupId === undefined) {
        // dont know what to do here yet
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

const getAllMessagesFromUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { recipientId, creatorId } = req.body;
    try {
        const allMessages = await listOfAllMessagesFromUser(
            recipientId,
            creatorId,
        );

        res.json(allMessages);
    } catch (err) {
        next(err);
    }
};

const getLastTenMessagesReceived = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const lastMessageIds = await db.any(
            "SELECT message_id FROM message_recipient WHERE recipient_id = $1 ORDER BY id DESC LIMIT 10",
            [req.params.id],
        );
        if (!lastMessageIds.length) {
            return res.status(404).json({ error: "No messages found" });
        }
        const arrMessageId = lastMessageIds.map(
            (n: { message_id: number }) => n.message_id,
        );
        const lastTenMessages = await db.any(
            "SELECT * FROM messages where id IN ( $1:list )",
            [arrMessageId],
        );
        return res.status(200).json(lastTenMessages);
    } catch (err) {
        next(err);
    }
};

const getLastTenMessagesSent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { creatorId } = req.params;

    try {
        const lastMessagesSent = await listOfLastTenMessagesSent(creatorId);

        res.json(lastMessagesSent);
    } catch (err) {
        next(err);
    }
};

export {
    sendMessage,
    getLastTenMessagesReceived,
    getAllMessagesFromUser,
    getLastTenMessagesSent,
};
