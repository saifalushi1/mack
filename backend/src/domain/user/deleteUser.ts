import dbConnection from "../../connection";
import { Request, Response, NextFunction } from "express";

export async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const db = dbConnection();
        const deletedUser = await db.result("DELETE FROM users WHERE id = $1", [
            req.params.id,
        ]);
        res.json({
            deltedUsers: deletedUser.rowCount,
            message: "succesfully deleted user",
        });
    } catch (err) {
        next(err);
    }
}
