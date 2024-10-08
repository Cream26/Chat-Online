import express from "express";
import dotenv from "dotenv";
import { setupSwagger, swaggerSpec } from "./swagger/swagger.js";
import router from "./routes/user.js";

dotenv.config();

const app = express();
setupSwagger(app);



app.use(express.json());
app.use("/", router);
app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec); // 生成 Swagger 文档 JSON
});



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("API docs available at http://localhost:3000/api-docs");
});
