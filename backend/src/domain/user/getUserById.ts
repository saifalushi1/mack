import dbConnection from "../../connection";
import { Request, Response, NextFunction } from "express";

export async function getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> {
    const { id } = req.params;
    const db = dbConnection();
    try {
        const userById = await db.one("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return res.json(userById);
    } catch (err) {
        next(err);
    }
}
