import { Request, Response } from "express";
import User from "../models/User.js";
import pkg from "jsonwebtoken";
import { AuthRequestBody } from "../types/Auth.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";
import crypto from "crypto";
import path from "path";
const { sign } = pkg;
// token的有效期为3天
const maxAge: number = 3 * 24 * 60 * 60 * 1000;
//创建token
const createToken = (email: string, userId: string) => {
  const jwt = process.env.JWT_KEY as string;
  console.log("JWT_KEY in createToken:", jwt);
  return sign({ email, userId }, jwt, { expiresIn: maxAge });
};
// 注册
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// 登录
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//获取用户信息
export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//更新用户信息
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body as {
      firstName: string;
      lastName: string;
      color: string;
    };
    if (!firstName || !lastName || color !== undefined) {
      res
        .status(400)
        .json({ error: "FirstName LastName and color is required" });
      return;
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      id: userData?.id,
      email: userData?.email,
      profileSetup: userData?.profileSetup,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      image: userData?.image,
      color: userData?.color,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//添加用户头像
export const addProfileImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Image is required" });
      return;
    }
    // 生成随机哈希值作为文件名
    const fileExtension = path.extname(req.file.originalname);
    const hashName = crypto.randomBytes(16).toString("hex");
    const fileName = `uploads/profiles/${hashName}${fileExtension}`;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      image: updatedUser?.image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//删除用户头像
export const removeProfileImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (user.image) {
      unlinkSync(user.image);
    }
    user.image = undefined;
    await user.save();

    res.status(200).json({ message: "Image removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//登出
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
