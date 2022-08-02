// const messagedb = require("./messageQueries");
import * as messagedb from "./messageQueries";
import express from "express";
const router = express.Router();

router.get("/lastReceived/:id", messagedb.getLastTenMessagesReceived);
router.get("/lastSent/:id", messagedb.getLastTenMessagesSent);
router.get("/test", messagedb.getAllMessagesFromUser);
router.post("/create/:creatorId/:recipient_id", messagedb.sendMessage);

export default router;
