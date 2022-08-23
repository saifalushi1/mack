import db from "../connection";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { creatorId, userMessage, groupId, recipientId } = req.body;
    let parentId;

    try {
        const lastMessageSentToRecipient = await db.oneOrNone(
            "SELECT messages.id FROM messages LEFT JOIN message_recipient " +
                "ON messages.id = message_recipient.message_id WHERE messages.creator_id = $1 AND message_recipient.recipient_id = $2 ORDER by messages.id DESC LIMIT 1",
            [creatorId, recipientId]
        );
        if (!lastMessageSentToRecipient) {
            parentId = null;
        } else {
            parentId = lastMessageSentToRecipient.id;
        }
        console.log(lastMessageSentToRecipient);
        const message = await db.one(
            "INSERT INTO messages (id, parent_message_id, message_body, created_on, creator_id) VALUES (DEFAULT, $<parent>, $<message>, current_timestamp, $<creator>) RETURNING id",
            {
                creator: creatorId,
                parent: parentId,
                message: userMessage
            }
        );
        await db.none(
            "INSERT INTO message_recipient (id, recipient_group_id, recipient_id, message_id) VALUES (DEFAULT, $<group_id>, $<recipient_id>, $<message>)",
            {
                group_id: groupId,
                recipient_id: recipientId,
                message: message.id
            }
        );
        console.log("recipient_id:", creatorId);
        console.log("creator:", recipientId);
        res.status(200).json({
            message,
            success: true
        });
    } catch (err) {
        next(err);
    }
};

const getAllMessagesFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messageIds = await db.any(
            "SELECT message_id FROM message_recipient WHERE recipient_id = $1",
            [req.body.user]
        );
        const arrMessageId = messageIds.map((n: { message_id: number }) => n.message_id);
        const allMessages = await db.any(
            "SELECT * FROM messages WHERE creator_id = $1 AND id IN ( $2:list )",
            [req.body.sender, arrMessageId]
        );
        res.status(200).json(allMessages);
    } catch (err) {
        next(err);
    }
};

const getLastTenMessagesReceived = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastMessageIds = await db.any(
            "SELECT message_id FROM message_recipient WHERE recipient_id = $1 ORDER BY id DESC LIMIT 10",
            [req.params.id]
        );
        if (!lastMessageIds.length) {
            return res.status(404).json({ error: "No messages found" });
        }
        const arrMessageId = lastMessageIds.map((n: { message_id: number }) => n.message_id);
        const lastTenMessages = await db.any("SELECT * FROM messages where id IN ( $1:list )", [
            arrMessageId
        ]);
        return res.status(200).json(lastTenMessages);
    } catch (err) {
        next(err);
    }
};

const getLastTenMessagesSent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastMessagesSent = await db.any(
            "SELECT * FROM messages WHERE creator_id = $1 ORDER BY id DESC LIMIT 10",
            [req.params.id]
        );
        res.status(200).json(lastMessagesSent);
    } catch (err) {
        next(err);
    }
};

export { sendMessage, getLastTenMessagesReceived, getAllMessagesFromUser, getLastTenMessagesSent };
