# BGM后端

## 技术栈

Node.js + Express + MySQL

## 运行

需要先启动 `MySQL` 数据库还要安装好 `Node.js`，然后修改 `config/default.yaml` 中的数据库配置，最后运行

```bash
# 使用包管理工具安装依赖
npm install
# 使用nodemon启动项目，不修改配置默认启动在3000端口
npm run start
```

## 数据库设计

### Music 表

- id (INT, 主键, 自增)
- title (VARCHAR, BGM名称)
- duration (INT, BGM长度)
- usedCount (INT, 使用数)
- category (INT, 外键, 参照 Categories 表)
- previewFile (VARCHAR, 预览文件的URL)

### Categories 表

- id (INT, 主键, 自增)
- title (VARCHAR, 类别名称)

### User 表

- openid (VARCHAR, 主键, 微信小程序用户的唯一标识)
- nickname (VARCHAR, 昵称)
- avatar (VARCHAR, 头像URL)

### SQL语句

```sql
CREATE TABLE `Categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Music` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `duration` INT NOT NULL,
  `usedCount` INT NOT NULL,
  `category` INT,
  `previewFile` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (category) REFERENCES Categories(id)
);

CREATE TABLE `User` (
  `openid` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255),
  PRIMARY KEY (`openid`)
);
```
