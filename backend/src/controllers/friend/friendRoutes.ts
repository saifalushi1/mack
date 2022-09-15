import db from "../../connection";
import { Request, Response, NextFunction } from "express";
import { getAllFriendsList, getUsersFriendsList } from "./queries/friendQuery";

const getAllFriends = async (req: Request, res: Response, next: NextFunction) => {
    const friendsList = getAllFriendsList;
    return res.json({ test: friendsList });
};

const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
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

interface accepted {
    status: 0;
}

interface rejected {
    status: 1;
}

interface pending {
    status: 2;
}

const createFriend = async (req: Request, res: Response, next: NextFunction) => {};

export { getAllFriends, getUserFriends };
