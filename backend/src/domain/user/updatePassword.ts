import dbConnection from "../../connection";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export async function updatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const db = dbConnection();
    let { password, id } = req.body;
    password = await bcrypt.hash(password, 10);
    try {
        await db.none("UPDATE users SET password = $1 WHERE id = $2", [
            password,
            id,
        ]);
        return res.json({ message: "succesfully updated password" });
    } catch (err) {
        next(err);
    }
}
