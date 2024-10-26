import { Request, Response } from "express";
import User from "../models/User.js";
import pkg  from "jsonwebtoken";
import { JWT_SECRET } from "../types/index.js";
import { AuthRequestBody, AuthControllerFunction } from "../types/Auth.js";
import { compare } from "bcrypt";
const {sign} = pkg;
// token的有效期为3天
const maxAge: number = 3 * 24 * 60 * 60 * 1000;
// jwt的密钥
const jwt: JWT_SECRET = String(process.env.JWT_SECRET);
//创建token
const createToken = (email: string, userId: string) => {
  return sign({ email, userId }, jwt, { expiresIn: maxAge });
};
// 注册
export const signUp: AuthControllerFunction = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
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
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      res.status(401).json({ error: "Invalid password" });
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