import { Request, Response, NextFunction } from "express";
import { listOfLastTenMessagesSent } from "./service";
export async function getLastTenMessagesSent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { creatorId } = req.params;

    try {
        const lastMessagesSent = await listOfLastTenMessagesSent(creatorId);

        res.json(lastMessagesSent);
    } catch (err) {
        next(err);
    }
}
