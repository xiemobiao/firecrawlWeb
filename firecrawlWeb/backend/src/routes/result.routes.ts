// 删除重复导入，保留一次
import { Router } from 'express';
import { getResultsByTask, exportResult } from '../controllers/result.controller';

const router = Router();

router.get('/task/:taskId', async (req, res, next) => { try { await getResultsByTask(req, res); } catch (err) { next(err); } });
router.get('/export/:resultId', async (req, res, next) => { try { await exportResult(req, res); } catch (err) { next(err); } });

export default router;
