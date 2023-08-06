import { Request, Response } from "express";
import { getAuthInfo } from "../authorization/getAuthInfo";
import { getUserFriendRequests } from "./service/getFriendRequests";

export async function getPendingFriendRequests(req: Request, res: Response) {
    const getAuthInfoResult = getAuthInfo(req);
    if (getAuthInfoResult.status === "failure") {
        res.status(500).json({ message: getAuthInfoResult.message });
        return;
    }

    try {
        const result = await getUserFriendRequests(
            getAuthInfoResult.payload.id,
        );
        if (result.status === "failure") {
            res.status(404).json({ message: result.message });
            return;
        }
        res.json({ listOfFriendRequests: result });
        return;
    } catch (err) {
        res.status(500).json({ message: "internal server error" });
        return;
    }
}
