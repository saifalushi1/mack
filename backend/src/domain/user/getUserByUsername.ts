import dbConnection from "../../connection";
import { Request, Response, NextFunction } from "express";

export async function getUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> {
    const db = dbConnection();
    const { username } = req.params;
    try {
        //When using like and passing special characters such as % you must use this format EXAMPLE: \'%$1#%\'
        //When passing a variable the library expects a string. So if it needs to be dynamic use `${}`
        const userByUsername = await db.any(
            "SELECT * FROM users WHERE username LIKE '$1#%'",
            `${username}`,
        );
        return res.json(userByUsername);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
