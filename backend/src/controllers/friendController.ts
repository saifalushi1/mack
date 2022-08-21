import express from "express";
const router = express.Router();
import authorization from "../middleware/authorization";
import * as friendDB from "./friendQueries";

router.get("/getallfriends", authorization, friendDB.getAllFriends);
router.get("/getuserfriends", authorization, friendDB.getUserFriends);

export default router;
