import express from "express";
import {
  signUp,
  login,
  getUserInfo,
  updateProfile,
} from "../controllers/Auth.js";
import { verifyToken } from "../middlewares/Auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/login", login);
AuthRouter.get("/getUserinfo", verifyToken, getUserInfo);
AuthRouter.post("/updateProfile", verifyToken, updateProfile);
export default AuthRouter;
