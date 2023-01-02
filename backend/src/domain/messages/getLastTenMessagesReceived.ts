import db from "../../connection";
import { Request, Response, NextFunction } from "express";

//REFACTOR TO SERVICE FUNC
export async function getLastTenMessagesReceived(
    req: Request,
    res: Response,
    next: NextFunction,
) {
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
}
