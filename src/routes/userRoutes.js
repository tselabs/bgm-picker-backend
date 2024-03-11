import express from 'express';

// 导出用户路由
export const router = express.Router();

/**
 * @swagger
 * /getUserInfo:
 *   post:
 *     summary: 获取用户信息
 *     description: 通过openid获取用户的信息，包括昵称和头像。
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openid:
 *                 type: string
 *                 description: 用户的openid。
 *                 example: "user-openid-example"
 *     responses:
 *       200:
 *         description: 成功获取用户信息，返回昵称和头像。
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nickname:
 *                   type: string
 *                   description: 用户的昵称。
 *                 avatar:
 *                   type: string
 *                   description: 用户的头像URL。
 *       404:
 *         description: 用户未找到。
 *       500:
 *         description: 服务器内部错误。
 */
router.post('/getUserInfo', async (req, res) => {
  try {
    // 获取请求体中的openid
    const { openid } = req.body;
    // 从数据库中查询openid对应的用户信息
    const [user] = await req.pool.query('SELECT * FROM User WHERE openid = ?', [openid]);
    // 如果查询到用户信息，则返回用户昵称和头像
    if (user) {
      res.json({ nickname: user.nickname, avatar: user.avatar });
    } else {
      // 如果没有查询到用户信息，则返回404
      res.status(404).send('User not found');
    }
  } catch (error) {
    // 如果发生错误，则返回500
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /editUserInfo:
 *   post:
 *     summary: 修改用户信息
 *     description: 更新用户的头像和昵称。
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openid:
 *                 type: string
 *                 description: 用户的openid。
 *                 example: "user-openid-example"
 *               avatarUrl:
 *                  type: string
 *                  description: 用户新的头像URL。
 *                  example: "https://example.com/user-avatar.jpg"
 *               nickname:
 *                  type: string
 *                  description: 用户新的昵称。
 *                  example: "New Nickname"
 *     responses:
 *       200:
 *         description: 用户信息更新成功。
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User info updated successfully"
 *       500:
 *         description: 服务器内部错误。
 */
router.post('/editUserInfo', async (req, res) => {
  try {
    // 获取请求体中的openid，头像URL和昵称
    const { openid, avatarUrl, nickname } = req.body;
    // 更新用户信息
    await req.pool.execute('UPDATE User SET avatar = ?, nickname = ? WHERE openid = ?', [avatarUrl, nickname, openid]);
    // 更新成功，则返回成功信息
    res.json({ message: 'User info updated successfully' });
  } catch (error) {
    // 如果发生错误，则返回500
    res.status(500).send('Server error');
  }
});

// 导出用户路由
export default router;