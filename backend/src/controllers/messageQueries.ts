const db = require("../connection");
require("dotenv").config();
import { Request, Response, NextFunction } from "express";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await db.one(
            "INSERT INTO messages (id, parent_message_id, message_body, created_on, creator_id) VALUES (DEFAULT, $<parent>, $<message>, current_timestamp, $<creator>) RETURNING id",
            {
                creator: req.params.creatorId,
                parent: req.body.parent,
                message: req.body.message
            }
        );
        //Query sometimes does not read / input recipient_id from req.body DO NOT KNOW WHY!!!!
        const receiver = await db.none(
            "INSERT INTO message_recipient (id, recipient_group_id, recipient_id, message_id) VALUES (DEFAULT, $<group_id>, $<recipient_id>, $<message>)",
            {
                group_id: req.body.group_id,
                recipient_id: req.params.recipient_id,
                message: message.id
            }
        );
        console.log("recipient_id:", req.params.recipient_id);
        console.log("creator:", req.params.creatorId);
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
        let arrMessageId = messageIds.map((n: { message_id: number }) => n.message_id);
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
        let arrMessageId = lastMessageIds.map((n: { message_id: number }) => n.message_id);
        const lastTenMessages = await db.any("SELECT * FROM messages where id IN ( $1:list )", [
            arrMessageId
        ]);
        res.status(200).json(lastTenMessages);
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

module.exports = {
    sendMessage,
    getLastTenMessagesReceived,
    getAllMessagesFromUser,
    getLastTenMessagesSent
};
