import * as messagedb from "./messageRoutes";
import express from "express";
import authorization from "../../middleware/authorization";
const router = express.Router();

router.get("/lastReceived/:id", authorization, messagedb.getLastTenMessagesReceived);
router.get("/lastSent/:creatorId", authorization, messagedb.getLastTenMessagesSent);
router.get("/test", authorization, messagedb.getAllMessagesFromUser);
router.post("/create", authorization, messagedb.sendMessage);

export default router;
