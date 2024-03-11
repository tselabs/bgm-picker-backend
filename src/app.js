import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import mysql from 'mysql2/promise';
import { router as musicRoutes } from './routes/musicRoutes.js';
import { router as userRoutes } from './routes/userRoutes.js';

// 读取配置文件
const config = yaml.load(fs.readFileSync('config/default.yaml', 'utf8'));

// 创建 express 应用实例
const app = express();

// 使用 express 的 json 中间件
app.use(express.json());

// 创建数据库连接池
const pool = mysql.createPool(config.database);

// 将连接池添加到请求对象中
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// API 路由
app.use('/api/music', musicRoutes);
app.use('/api/user', userRoutes);

// 启动服务器
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

// 导出应用实例
export default app;