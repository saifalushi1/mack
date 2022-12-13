import express from "express";
const router = express.Router();
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    login,
    logout,
    updatePassword,
} from "./userRoutes";
import { authorization } from "../../middleware/authorization";

router.get("/getall", authorization, getAllUsers);
router.get("/getbyid/:id", authorization, getUserById);
router.get("/getbyusername/:username", authorization, getUserByUsername);
router.post("/signup", createUser);
router.delete("/delete/:id", authorization, deleteUser);
router.post("/login", login);
router.post("/logout", authorization, logout);
router.patch("/changepassword", authorization, updatePassword);

export default router;
