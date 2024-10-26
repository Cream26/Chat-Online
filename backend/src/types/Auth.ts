import { Document } from "mongoose";
import { Request, Response } from "express";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  profileSetup: boolean;
  color?: string;
}
export interface AuthRequestBody {
  email: string;
  password: string;
}
export interface AuthResponseBody {
  id: string;
  email: string;
  profileSetup: boolean;
  firstName?: string;
  lastName?: string;
  image?: string;
  color?: string;
}

// 创建 Token 函数类型
export type CreateTokenFunction = (email: string, userId: string) => string;

// Auth 控制器函数类型
export type AuthControllerFunction = (
  req: Request<{}, any, AuthRequestBody>,
  res: Response<AuthResponseBody | { error: string }>
) => Promise<void>;