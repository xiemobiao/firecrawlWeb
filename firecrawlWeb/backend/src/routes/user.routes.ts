// 删除重复导入，保留一次
import { Router } from 'express';
import { register, login, getUserProfile } from '../controllers/user.controller';

const router = Router();

router.post('/register', async (req, res, next) => { try { await register(req, res); } catch (err) { next(err); } });
router.post('/login', async (req, res, next) => { try { await login(req, res); } catch (err) { next(err); } });
router.get('/profile', async (req, res, next) => { try { await getUserProfile(req, res); } catch (err) { next(err); } });

export default router;
