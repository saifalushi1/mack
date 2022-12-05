import express from "express";
const router = express.Router();
import authorization from "../../middleware/authorization";
import { getAllFriends, getUserFriends } from "../../domain/friend/index";

router.get("/getallfriends", authorization, getAllFriends);
router.get("/getuserfriends", authorization, getUserFriends);

export default router;
