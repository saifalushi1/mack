import { Request, Response, NextFunction } from "express";
import { getUsersFriendsList } from "./service/getUsersFriendsList";

export const getUserFriends = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userID = req.query.id as string;

    if (!userID) {
        return res.status(400).json({ error: "must provide a userID" });
    }
    try {
        const friendsList = await getUsersFriendsList(userID);
        if (friendsList.length === 0) {
            res.json({ friends: "This user has no friends" });
        }
        return res.json({ friends: friendsList });
    } catch (err) {
        next(err);
    }
};
