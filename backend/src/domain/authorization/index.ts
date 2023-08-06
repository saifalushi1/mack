import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CookieOptions } from "express";
dotenv.config();

interface UserInformation {
    id: number;
    username: string;
}

interface AuthResult {
    token: string;
    cookieOptions: CookieOptions;
}

export function generateAuthToken(
    userInfo: UserInformation,
    remember: boolean,
): AuthResult {
    // console.time();
    const token = jwt.sign(
        { id: userInfo.id, username: userInfo.username },
        process.env.SECRET!,
    );
    let cookieOptions: CookieOptions = {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 3600000,
        expires: new Date(Date.now() + 1 * 24 * 3600000),
    };
    if (remember) {
        cookieOptions = {
            ...cookieOptions,
            maxAge: 7 * 24 * 3600000,
            expires: new Date(Date.now() + 7 * 24 * 3600000),
        };
    }
    // console.timeEnd();
    return {
        token,
        cookieOptions,
    };
}
