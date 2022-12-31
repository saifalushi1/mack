import { Request, Response, NextFunction } from "express";
import { listOfAllMessagesFromUser } from "./service";

export async function getAllMessagesFromUser(
    req: Request,
    res: Response,
    next: NextFunction,
) {
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
}
