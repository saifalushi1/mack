import db from "../../connection";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export async function createUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ error: "Missing field" });
    }
    try {
        const isUsernameTaken = await db.result(
            "SELECT * FROM users WHERE username = $1",
            [username],
        );
        const isEmailTaken = await db.result(
            "SELECT * FROM users WHERE email = $1",
            [email],
        );

        if (isUsernameTaken.rowCount > 0) {
            return res.status(409).json({ error: "Username already taken" });
        }
        if (isEmailTaken.rowCount > 0) {
            return res.status(409).json({ error: "Email already taken" });
        }

        const createdUser = await db.result(
            "INSERT INTO users (id, username, password, email, first_name, last_name, created_on, is_active) VALUES(DEFAULT, $<username>, $<password>, $<email>, $<name.first>, $<name.last>, current_timestamp, 0) RETURNING id",
            {
                username: username,
                password: await bcrypt.hash(password, 10),
                email: email,
                name: { first: firstName, last: lastName },
            },
        );
        return res.json({ createdUser: createdUser.rows });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
