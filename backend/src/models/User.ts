import mongoose from "mongoose";
import { IUser } from "../types/Auth.js";
import { genSalt, hash } from "bcrypt";
//创建用户模型，包含用户的基本信息
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  //解释：用户的个人资料是否已经设置
  profileSetup: {
    type: Boolean,
    default: false,
  },
});
//采用bcrypt对密码进行加密
userSchema.pre<IUser>("save", async function (next) {
  const salt = await genSalt(); //生成一个salt
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model<IUser>("Users", userSchema);

export default User;
