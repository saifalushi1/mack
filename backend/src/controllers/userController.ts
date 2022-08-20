import express from "express";
const router = express.Router();
import * as userDB from "./userQueries";
import authorization from "../middleware/authorization";

router.get("/getall", authorization, userDB.getAllUsers);
router.get("/getbyid/:id", authorization, userDB.getUserById);
router.get("/getbyusername/:username", authorization, userDB.getUserByUsername);
router.post("/signup", userDB.createUser);
router.delete("/delete/:id", authorization, userDB.deleteUser);
router.post("/login", userDB.login);
router.post("/logout", authorization, userDB.logout);

export default router;
