import express from "express";
const router = express.Router();
import { authorization } from "../../middleware/authorization";
import {
    createFriend,
    getUserFriends,
    getPendingFriendRequests,
    editFriendRequest,
} from "../../domain/friend/index";

router.get("/getuserfriends", authorization, getUserFriends);
router.get(
    "/getPendingFriendRequests",
    authorization,
    getPendingFriendRequests,
);
router.post("/sendFriendRequest", authorization, createFriend);
router.patch("/updateFriendRequest", authorization, editFriendRequest);

export default router;
