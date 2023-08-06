import { Request } from "express";
import jwt from "jsonwebtoken";

interface GetAuthInfoSuccess {
    status: "success";
    payload: any;
    // payload: {id: number, username: string, iat: number}
}
interface GetAuthInfoFailure {
    status: "failure";
    message: string;
}
type GetAuthInfoResult = GetAuthInfoFailure | GetAuthInfoSuccess;

export function getAuthInfo(req: Request): GetAuthInfoResult {
    const token = req.cookies.access_token;
    if (!token) {
        return {
            status: "failure",
            message: "missing access token",
        };
    }
    try {
        const payload = jwt.verify(token, process.env.secret!);
        if (typeof payload === "string") {
            return {
                status: "failure",
                message: "could not get user info from cookies",
            };
        }
        return {
            status: "success",
            payload,
        };
    } catch (err) {
        return {
            status: "failure",
            message: `could not verify access token. error message: ${err}`,
        };
    }
}
