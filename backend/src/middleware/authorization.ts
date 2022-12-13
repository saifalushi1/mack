import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authorization(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({ error: "No token fonud" });
    }
    try {
        jwt.verify(token, process.env.SECRET!);
        return next();
    } catch {
        return res.sendStatus(404);
    }
}
