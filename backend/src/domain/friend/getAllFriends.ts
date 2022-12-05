import { getAllFriendsList } from "./service/getAllFriends";
import { Request, Response, NextFunction } from "express";

export const getAllFriends = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const friendsList = getAllFriendsList;
    return res.json({ test: friendsList });
};
