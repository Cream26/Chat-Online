import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: 获取Hello World信息
 *     description: 返回 Hello World 消息
 *     responses:
 *       200:
 *         description: 成功
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: 获取用户信息
 *     description: 返回用户的基本信息
 *     responses:
 *       200:
 *         description: 成功
 */
router.get("/user", (req, res) => {
  res.status(200).json({ message: "User information" });
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: 获取指定用户信息
 *     description: 根据用户ID返回用户信息
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功
 *       404:
 *         description: 用户未找到
 */
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  // 假设有一个函数 getUserById 来获取用户信息
  const user = "zhangsan" // 这里你需要实现 getUserById
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: 创建新用户
 *     description: 根据请求体创建新用户
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: 用户创建成功
 *       400:
 *         description: 请求体格式不正确
 */
router.post("/user", (req, res) => {
  const { name, email } = req.body;
  // 假设有一个函数 createUser 来创建用户
  const newUser = "name" // 这里你需要实现 createUser
  res.status(201).json(newUser);
});

export default router;
