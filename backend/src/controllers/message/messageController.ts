import {
    getAllMessagesFromUser,
    getLastTenMessagesReceived,
    getLastTenMessagesSent,
    sendMessage,
} from "./messageRoutes";
import express from "express";
import { authorization } from "../../middleware/authorization";
const router = express.Router();

router.get("/lastReceived/:id", authorization, getLastTenMessagesReceived);
router.get("/lastSent/:creatorId", authorization, getLastTenMessagesSent);
router.get("/test", authorization, getAllMessagesFromUser);
router.post("/create", authorization, sendMessage);

export default router;
