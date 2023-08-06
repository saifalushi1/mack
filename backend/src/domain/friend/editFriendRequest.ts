import { Request, Response } from "express";
import { changeFriendRequestStatus } from "./service/changeFriendRequestStatus";

export async function editFriendRequest(req: Request, res: Response) {
    try {
        // theres no logic that stops you from updating someone else friend request
        // but bad actors would need to aquire the ids of the row so... meh
        const { friendRequestId, accepted } = req.body;
        if (!friendRequestId || !accepted) {
            res.status(400).json({ message: "invalid arguments" });
        }

        const result = await changeFriendRequestStatus(
            friendRequestId,
            accepted,
        );
        switch (result.status) {
            case "failure":
                res.status(409).json({
                    message: result.message || "not a valid friend request",
                });
                return;
            case "success":
                res.json({ message: "friend request successfully updated" });
        }
    } catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
}
