import express from "express";
const router = express.Router();
import * as userdb from "./userQueries";
import authorization from "../middleware/authorization";

router.get("/getall", authorization, userdb.getAllUsers);
router.get("/getbyid/:id", authorization, userdb.getUserById);
router.get("/getbyusername/:username", authorization, userdb.getUserByUsername);
router.post("/signup", userdb.createUser);
router.delete("/delete/:id", authorization, userdb.deleteUser);
router.post("/login", userdb.login);
router.post("/logout", authorization, userdb.logout);

export default router;
