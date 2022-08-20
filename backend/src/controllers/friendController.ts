import express from "express";
const router = express.Router();
import authorization from "../middleware/authorization";
import * as friendDB from "./friendQueries";

router.get("/getfriends", friendDB.getAllFriends);
