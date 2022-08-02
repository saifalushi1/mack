import express from "express";
const router = express.Router();
import * as userdb from "./userQueries";

router.get("/getall", userdb.getAllUsers);
router.get("/getbyid/:id", userdb.getUserById);
router.get("/getbyusername/:username", userdb.getUserByUsername);
router.post("/signup", userdb.createUser);
router.delete("/delete/:id", userdb.deleteUser);
router.post("/login", userdb.login);

module.exports = router;
