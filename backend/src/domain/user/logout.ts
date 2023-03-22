import dbConnection from "../../connection";
import { Request, Response, NextFunction } from "express";

export async function logout(req: Request, res: Response, next: NextFunction) {
    const db = dbConnection();
    try {
        await db.none("UPDATE users SET is_active = 0 WHERE id = $1", [
            req.body.id,
        ]);
        return res
            .clearCookie("access_token")
            .json({ message: "Successfully logged out" });
    } catch (err) {
        next(err);
    }
}
