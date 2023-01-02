import db from "../../connection";
import { Request, Response, NextFunction } from "express";

export async function getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> {
    try {
        const users = await db.any("SELECT * FROM users");
        const cookie = req.headers.cookie;
        return res.json({ users: users, cookie: cookie });
    } catch (err) {
        next(err);
    }
}
