import express from "express";
import { signup,login,logout, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/update-profile",protectRoute ,updateProfile)
authRouter.get("/check", protectRoute, (req,res) => res.status(200).json(req.user));

export default authRouter;