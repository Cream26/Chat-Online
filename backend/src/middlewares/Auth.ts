import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// 扩展 Express 的 Request 接口
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
//验证token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided" }) as unknown as void;
  }
  jwt.verify(
    token,
    process.env.JWT_KEY as string,
    async (err: any, payload: any) => {
      if (err) {
        console.log("Token verification error:", err);
        return res
          .status(403)
          .json({ error: "token is not valid" }) as unknown as void;
      }  
      req.userId = payload.userId;
      next();
    }
  );
};
