import express from "express";
import { createNewUser, getMe, loginUser, logoutUser } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/newUser",createNewUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenticated,logoutUser);
router.get("/getMe",isAuthenticated,getMe);

export default router;