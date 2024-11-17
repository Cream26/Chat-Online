import express from "express";
import {
  signUp,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logout,
} from "../controllers/Auth.js";
import { verifyToken } from "../middlewares/Auth.js";
import multer from "multer";

const AuthRouter = express.Router();
// 作用：解析请求中的文件
const upload = multer({ dest: "uploads/profiles" });

AuthRouter.post("/signup", signUp);
AuthRouter.post("/login", login);
AuthRouter.get("/getUserinfo", verifyToken, getUserInfo);
AuthRouter.post("/updateProfile", verifyToken, updateProfile);
AuthRouter.post(
  "/addProfileImage",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
AuthRouter.delete("/deleteProfileImage", verifyToken, removeProfileImage);
AuthRouter.post("/logout",logout)

export default AuthRouter;
