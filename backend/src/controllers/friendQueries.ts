import db from "../connection";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const getAllFriends = async (req: Request, res: Response, next: NextFunction) => {
    const friendsList = await db.any(
        "SELECT a.username, b.username FROM friends JOIN users a ON a.id = user_a JOIN users b ON b.id = user_b ORDER BY a.username, b.username"
    );
    return res.json({ test: friendsList });
};

const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
    const friendsList = await db.any(
        "SELECT a.username, b.username FROM friends JOIN users a ON a.id = 2 JOIN users b ON b.id = user_b ORDER BY a.username, b.username"
    );
    return res.json({ test: friendsList });
};

export { getAllFriends };
