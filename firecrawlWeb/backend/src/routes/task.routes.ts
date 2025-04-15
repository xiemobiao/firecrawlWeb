// 删除重复导入，保留一次
import { Router } from 'express';
import { createTask, getTasks, getTaskById } from '../controllers/task.controller';

const router = Router();

router.post('/', async (req, res, next) => { try { await createTask(req, res); } catch (err) { next(err); } });
router.get('/', async (req, res, next) => { try { await getTasks(req, res); } catch (err) { next(err); } });
router.get('/:id', async (req, res, next) => { try { await getTaskById(req, res); } catch (err) { next(err); } });

export default router;
