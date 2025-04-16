import { Router } from 'express';
import { getResultsByTaskId } from '../controllers/result.controller';

const router = Router();

router.get('/task/:taskId', getResultsByTaskId);

export default router;
