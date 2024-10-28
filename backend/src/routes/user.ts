import express from "express";
import { signUp, login, getUserInfo } from "../controllers/Auth.js";
import { verifyToken } from "../middlewares/Auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/login", login);
AuthRouter.get("/getUserinfo",verifyToken , getUserInfo )
export default AuthRouter;
