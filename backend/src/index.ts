import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { DATABASE_URL, PORT, ORIGIN } from "./types/index.js";
import AuthRouter from "./routes/User.js";

dotenv.config();
const app = express();
const PORT: PORT = Number(process.env.PORT) || 3000;
const ORIGIN: ORIGIN = process.env.ORIGIN!;
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// 作用：设置静态文件目录，可以使得uploads/profiles目录下的文件可以作为静态资源被客户端访问
app.use("/uploads/profiles", express.static("uploads/profiles"));

//作用：解析请求中的cookie
app.use(cookieParser());
//作用：解析请求中的json数据
app.use(express.json());
const DatabaseURL: DATABASE_URL = process.env.DATABASE_URL!;
app.use("/api/auth", AuthRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(DatabaseURL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error.message);
  });
