import express from 'express';

export const router = express.Router();

// 获取音乐列表
router.get('/getMusicList', async (req, res) => {
  try {
    // 从Music表中查询所有数据
    const [rows] = await req.pool.query('SELECT * FROM Music');
    // 返回音乐列表
    res.json({ musicList: rows });
  } catch (error) {
    // 服务器错误
    res.status(500).send('Server error');
  }
});

// 根据id获取音乐
router.get('/getMusicById', async (req, res) => {
  try {
    // 获取请求中的id
    const musicId = req.query.id;
    // 从Music表中查询id对应的数据
    const [rows] = await req.pool.query('SELECT * FROM Music WHERE id = ?', [musicId]);
    // 如果查询到数据，则返回数据
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      // 如果没有查询到数据，则返回未找到
      res.status(404).send('Music not found');
    }
  } catch (error) {
    // 服务器错误
    res.status(500).send('Server error');
  }
});

// 获取分类列表
router.get('/getCategories', async (req, res) => {
  try {
    // 从Categories表中查询所有数据
    const [rows] = await req.pool.query('SELECT * FROM Categories');
    // 返回分类列表
    res.json({ categories: rows });
  } catch (error) {
    // 服务器错误
    res.status(500).send('Server error');
  }
});

// 根据分类获取音乐
router.get('/getMusicByCategory', async (req, res) => {
  try {
    // 获取请求中的分类id
    const categoryId = req.query.category;
    // 从Music表中查询分类id对应的数据
    const [rows] = await req.pool.query('SELECT * FROM Music WHERE category = ?', [categoryId]);
    // 返回音乐列表
    res.json({ musicList: rows });
  } catch (error) {
    // 服务器错误
    res.status(500).send('Server error');
  }
});

export default router;