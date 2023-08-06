import { createUsersFriend } from "./service/createUsersFriend";
import { Request, Response, NextFunction } from "express";

export async function createFriend(req: Request, res: Response) {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) {
        return res.status(400).json({ message: "invalid arguments" });
    }
    try {
        const createFriend = await createUsersFriend(userId, friendId);
        if (createFriend.result === "failure") {
            return res.json({
                status: "failure",
                message: " existing friend request already sent",
            });
        }
        res.json({
            status: "success",
            message: "friend request sent successfuly",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "there was an internal server error" });
    }
}
