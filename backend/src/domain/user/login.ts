import db from "../../connection";
import { Request, Response, NextFunction, CookieOptions } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password, remember } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Must provide email and password" });
    }
    try {
        const doesUserExist = await db.result(
            "SELECT * FROM users WHERE email = $1",
            [email],
        );

        if (doesUserExist.rowCount === 0) {
            return res.status(404).json({ error: "No account found" });
        }

        const userInfo = await db.one("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        const match = await bcrypt.compare(password, userInfo.password);

        if (!match) {
            return res
                .status(401)
                .json({ error: "Incorrect email or password" });
        }

        await db.none("UPDATE users SET is_active = 1 WHERE id = $1", [
            userInfo.id,
        ]);

        const token = jwt.sign(
            { id: userInfo.id, username: userInfo.username },
            process.env.SECRET!,
        );
        let cookieOptions: CookieOptions = {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
        };
        if (remember) {
            cookieOptions = {
                ...cookieOptions,
                maxAge: 7 * 24 * 3600000,
                expires: new Date(Date.now() + 7 * 24 * 3600000),
            };
        }
        res.cookie("access_token", token, cookieOptions).json({
            match: match,
            userinfo: {
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
                firstName: userInfo.first_name,
                lastName: userInfo.last_name,
            },
        });

        return;
    } catch (err) {
        console.log("an error occured while trying to log the user in");
    }
}
