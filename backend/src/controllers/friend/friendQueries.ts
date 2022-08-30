import db from "../../connection";
import { Request, Response, NextFunction } from "express";

const getAllFriends = async (req: Request, res: Response, next: NextFunction) => {
    const friendsList = await db.any(
        "SELECT a.username, b.username FROM friends JOIN users a ON a.id = user_a JOIN users b ON b.id = user_b ORDER BY a.username, b.username"
    );
    return res.json({ test: friendsList });
};

const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.query.id;
    if (!userID) {
        return res.status(400).json();
    }
    try {
        const friendsList = await db.any(
            "SELECT a.username, b.username FROM friends JOIN users a ON a.id = $1 JOIN users b ON b.id = user_b ORDER BY a.username, b.username",
            [userID]
        );
        if (!friendsList.length) {
            res.json({ friends: "This user has no friends" });
        }
        return res.json({ friends: friendsList });
    } catch (err) {
        next(err);
    }
};

interface accepted {
    status: 1;
}

interface pending {
    status: 2;
}

interface rejected {
    status: 0;
}

interface accepted {
    status: 1;
}

const createFriend = async (req: Request, res: Response, next: NextFunction) => {};

export { getAllFriends, getUserFriends };
