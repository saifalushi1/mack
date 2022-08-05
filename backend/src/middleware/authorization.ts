import db from "../connection";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    console.log(req.cookies);
    if (!token) {
        return res.status(403).json({ error: "No token fonud" });
    }
    try {
        jwt.verify(token, process.env.SECRET!);
        return next();
    } catch {
        return res.sendStatus(404);
    }
};
export default authorization;
